'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { useImmer } from 'use-immer'

import { useAuthContext } from '@/context/AuthContext'
import { AddressData } from '@/types/common'
import { getAddress } from '@/services/address'
import Title from '@/components/Title'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import BottomDialog from '@/components/BottomDialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { updateUser } from '@/services/auth'
import { cn } from '@/lib/utils'

function AvatarDemo({ src }: { src?: string }) {
  return (
    <Avatar className="h-8 w-8 border-2 md:h-10 md:w-10">
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-8 w-8 md:h-10 md:w-10" />
      </AvatarFallback>
    </Avatar>
  )
}

function Card({ address, onClick }: { address: AddressData; onClick: () => void }) {
  return (
    <section
      onClick={onClick}
      className="flex items-center justify-between rounded-xl bg-white p-4"
    >
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="grid h-8 w-auto place-items-center rounded-xl bg-primary-foreground text-primary">
            {address.CVSStoreName || '取貨地點'}
          </span>
          <p>{address.name}</p>
          <p>{address.tel}</p>
        </span>
        <span className="text-gray-500">{address.CVSAddress || address.address}</span>
      </div>
      <ExternalLink className="text-gray-500" />
    </section>
  )
}

type LabelMap = {
  name: string
  id: string
  mobile: string
  email: string
}

type LabelKey = keyof LabelMap

const labelMap: Record<LabelKey, string> = {
  name: '暱稱',
  id: '身分證字號',
  mobile: '電話',
  email: 'E-mail',
}

const ProfilePage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { user, refreshUser } = useAuthContext()

  const [addresses, setAddresses] = useImmer<AddressData[]>([])
  const [formValues, setFormValues] = useImmer<LabelMap>({
    name: '',
    id: '',
    mobile: '',
    email: '',
  })

  const [selectedField, setSelectedField] = useState<LabelKey>()
  const [selectedFieldValue, setSelectedFieldValue] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFormEdited, setIsFormEdited] = useState(false)

  useEffect(() => {
    getAddress().then(({ data }) => {
      setAddresses(data?.data || [])
    })
  }, [setAddresses])

  useEffect(() => {
    if (!user) return

    setFormValues((draft) => {
      draft.name = user.name ?? ''
      draft.id = user.id.toString() ?? ''
      draft.mobile = user.mobile ?? ''
      draft.email = user.email
    })
  }, [user, setFormValues])

  function handleConfirm() {
    setFormValues((draft) => {
      draft[selectedField!] = selectedFieldValue
    })
    setIsFormEdited(true)
    setIsDialogOpen(false)
  }

  async function handleSubmit() {
    try {
      const { resultcode, resultmessage } = await updateUser(formValues)
      if (resultcode === 0) {
        setIsFormEdited(false)
        refreshUser()
        toast({
          description: '更新成功',
          className: 'bg-cyan-500 text-white',
        })
      } else {
        throw new Error(resultmessage)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `${error}`,
      })
    }
  }

  const fields = Object.entries(formValues) as [keyof LabelMap, string][]

  return (
    <main className="min-h-screen bg-default">
      <Title title="個人中心" goBackUrl="/member" />

      <div className="flex flex-col gap-4 p-4">
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col">
          <section className="flex flex-col divide-y divide-secondary overflow-hidden rounded-lg">
            <div className="flex items-center justify-between bg-white p-4 py-2">
              <span>頭像</span>
              <span className="flex items-center gap-2">
                {user ? (
                  <AvatarDemo src={user.img ?? ''} />
                ) : (
                  <Skeleton className="h-8 w-8 rounded-full md:h-10 md:w-10" />
                )}
              </span>
            </div>

            {fields.map(([key, value]) => (
              <div
                key={key}
                className={cn(
                  'flex min-h-12  items-center justify-between bg-white p-4 py-2 md:min-h-14',
                  {
                    'cursor-pointer': key !== 'id',
                    'cursor-not-allowed': key === 'id',
                  },
                )}
                onClick={() => {
                  if (key === 'id') return
                  setSelectedField(key)
                  setSelectedFieldValue(value)
                  setIsDialogOpen(true)
                }}
              >
                <span>{labelMap[key]}</span>
                <span
                  className={cn({
                    'text-gray-500': key === 'id',
                  })}
                >
                  {!user ? <Skeleton className="h-6 w-28" /> : value}
                </span>
              </div>
            ))}
          </section>

          {isFormEdited && (
            <Button className="mt-4 rounded-lg" variant="primary" onClick={handleSubmit}>
              送出
            </Button>
          )}
        </form>

        {addresses.map((address, i) => (
          <Card
            key={i}
            address={address}
            onClick={() => {
              router.push(`/confirm-order/upsert-receipt?id=${address.id}`)
            }}
          />
        ))}
      </div>

      {isDialogOpen && (
        <BottomDialog
          className="h-[180px]"
          title={labelMap[selectedField!]}
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="flex gap-4">
            <Input
              className="flex-1 bg-white text-base outline-none"
              defaultValue={formValues[selectedField!]}
              onChange={(e) => {
                setSelectedFieldValue(e.target.value)
              }}
            />
            <Button
              disabled={!selectedFieldValue || selectedFieldValue === formValues[selectedField!]}
              className="rounded-lg"
              variant="primary"
              onClick={handleConfirm}
            >
              確認
            </Button>
          </div>
        </BottomDialog>
      )}
    </main>
  )
}

export default ProfilePage
