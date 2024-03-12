'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRightIcon, Loader2 } from 'lucide-react'
import { useImmer } from 'use-immer'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import AddressCard from '@/app/profile/AddressCard'
import CustomFormItem, { formSchema } from '@/app/profile/CustomFormItem'
import { useAuthContext } from '@/context/AuthContext'
import { AddressData } from '@/types/common'
import { getAddress } from '@/services/address'
import Title from '@/components/Title'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { updateUser } from '@/services/auth'
import { Form, FormField } from '@/components/ui/form'

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

function ProfilePage() {
  const router = useRouter()

  const { toast } = useToast()

  const { user, isLoadingUser, refreshUser } = useAuthContext()

  const [addresses, setAddresses] = useImmer<AddressData[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      id: '',
      mobile: '',
      email: '',
    },
  })

  useEffect(() => {
    getAddress().then(({ data }) => {
      setAddresses(data?.data || [])
    })
  }, [setAddresses])

  useEffect(() => {
    if (!user) {
      refreshUser()
    } else {
      form.reset({
        name: user.name ?? '',
        id: user.id.toString() ?? '',
        mobile: user.mobile ?? '',
        email: user.email ?? '',
      })
    }
  }, [user, form, refreshUser])

  async function handleSubmit(result: z.infer<typeof formSchema>) {
    try {
      const { resultcode, resultmessage } = await updateUser(result)

      if (resultcode === 0) {
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

  function handleEditAvatar() {
    router.push('/profile/avatar')
  }

  return (
    <main className="min-h-screen bg-background">
      <Title title="個人中心" goBackUrl="/member" />

      <div className="flex flex-col gap-4 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col">
            <section className="flex flex-col divide-y divide-secondary overflow-hidden rounded-lg">
              <div className="flex items-center justify-between bg-white p-4 py-2">
                <span>頭像</span>
                <span className="flex cursor-pointer items-center gap-2" onClick={handleEditAvatar}>
                  {user ? (
                    <AvatarDemo src={user.img ?? ''} />
                  ) : (
                    <Skeleton className="h-8 w-8 rounded-full md:h-10 md:w-10" />
                  )}
                  {user ? (
                    <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                  ) : (
                    <Skeleton className="h-4 w-4" />
                  )}
                </span>
              </div>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <CustomFormItem disabled={!user} label="暱稱" field={field} />
                )}
              />

              <FormField
                name="id"
                control={form.control}
                render={({ field }) => <CustomFormItem disabled label="身分證字號" field={field} />}
              />

              <FormField
                name="mobile"
                control={form.control}
                render={({ field }) => (
                  <CustomFormItem disabled={!user} label="電話" field={field} />
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <CustomFormItem disabled={!user} label="E-mail" field={field} />
                )}
              />
            </section>

            <Button
              disabled={isLoadingUser || !user || !form.formState.isDirty}
              type="submit"
              className="mt-4 rounded-lg"
              variant="primary"
            >
              {isLoadingUser ? <Loader2 className="h-4 w-4 animate-spin" /> : '確認修改'}
            </Button>
          </form>
        </Form>

        {addresses.map((address, i) => (
          <AddressCard
            key={i}
            address={address}
            onClick={() => {
              router.push(`/confirm-order/upsert-receipt?id=${address.id}`)
            }}
          />
        ))}
      </div>
    </main>
  )
}

export default ProfilePage
