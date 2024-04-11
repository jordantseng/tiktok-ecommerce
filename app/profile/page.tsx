'use client'

import Image from 'next/image'
import { useEffect, MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRightIcon, Loader2 } from 'lucide-react'
import { useImmer } from 'use-immer'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import AddressCard from '@/app/profile/AddressCard'
import MyAvatar from '@/app/profile/MyAvatar'
import StatusButton from '@/app/profile/StatusButton'
import ProfileFormItem, { ProfileFormItemLayout, formSchema } from '@/app/profile/ProfileFormItem'
import { useAuthContext } from '@/context/AuthContext'
import { AddressData } from '@/types/common'
import { deleteAddress, getAddress } from '@/services/address'
import Title from '@/components/Title'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { updateUser } from '@/services/auth'
import { Form, FormField } from '@/components/ui/form'
import { getBaseURL } from '@/lib/utils'

function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoadingUser, refreshUser, handleBindTiktok } = useAuthContext()
  const [addresses, setAddresses] = useImmer<AddressData[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const tiktokId = user?.tiktokid

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      mobile: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    getAddress(baseURL).then(({ data }) => {
      setAddresses(data?.data || [])
    })
  }, [setAddresses])

  useEffect(() => {
    if (!user) {
      refreshUser()
    } else {
      form.reset({
        id: user.tiktokid ? user.name! : user.id.toString(),
        mobile: user.mobile ?? '',
        email: user.email ?? '',
        password: '********',
      })
    }
  }, [user, form, router, refreshUser])

  async function handleSubmit(result: z.infer<typeof formSchema>) {
    const baseURL = getBaseURL(window.location.host)

    try {
      const { resultcode, resultmessage } = await updateUser(baseURL, {
        ...result,
        name: user?.name,
      })

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

  function handleAddAddress(e: MouseEvent) {
    e.preventDefault()
    router.push('/confirm-order/upsert-receipt?from=/profile')
  }

  function handleBindTiktokAccount(e: MouseEvent) {
    e.preventDefault()

    if (!tiktokId) {
      handleBindTiktok()
    } else {
      toast({
        variant: 'destructive',
        description: '已經綁定過 Tiktok 帳號',
      })
    }
  }

  function handleToggleEdit() {
    setIsEditing((prev) => !prev)
    if (!isEditing) {
      setIsEditing(true)
    } else {
      form.handleSubmit(handleSubmit)()
      setIsEditing(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Title
        title="個人中心"
        goBackUrl="/member"
        rightComponent={
          <Button
            onClick={handleToggleEdit}
            disabled={isLoadingUser || !user || (isEditing && !form.formState.isDirty)}
            className="rounded-lg"
            variant="ghost"
          >
            {isLoadingUser ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              '儲存'
            ) : (
              '編輯'
            )}
          </Button>
        }
      />

      <div className="flex flex-col gap-4 p-4">
        <Form {...form}>
          <form className="flex w-full flex-col">
            <section className="flex flex-col divide-y divide-secondary overflow-hidden rounded-lg">
              <div className="flex items-center justify-between bg-white p-4 py-2">
                <span className="text-gray-500">頭像</span>
                <span className="flex cursor-pointer items-center gap-2" onClick={handleEditAvatar}>
                  {user ? (
                    <MyAvatar src={user.img ?? ''} />
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
                name="id"
                control={form.control}
                render={({ field }) => <ProfileFormItem disabled label="ID" field={field} />}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => <ProfileFormItem disabled label="電子信箱" field={field} />}
              />

              <FormField
                name="mobile"
                control={form.control}
                render={({ field }) => (
                  <ProfileFormItem
                    disabled={!user || !isEditing}
                    label="手機號碼"
                    type="number"
                    field={field}
                  />
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <ProfileFormItem
                    readOnly
                    onClick={() => {
                      router.push('/reset-password')
                    }}
                    type="password"
                    label="登錄密碼"
                    field={field}
                  />
                )}
              />

              <ProfileFormItemLayout
                label={
                  <div className="flex items-center gap-1">
                    <Image
                      src="/tiktok-logo.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="h-8 w-8 cursor-pointer rounded-full border-2 bg-black p-1"
                    />
                    <span>Tiktok 帳號</span>
                  </div>
                }
              >
                <div className="flex items-center gap-1">
                  <StatusButton
                    title={!tiktokId ? '連動' : `已綁定 (${user.username})`}
                    disabled={!tiktokId}
                    onClick={handleBindTiktokAccount}
                  />
                </div>
              </ProfileFormItemLayout>
            </section>

            <Button
              onClick={handleAddAddress}
              disabled={isLoadingUser || !user}
              className="mt-4 rounded-lg"
              variant="primary"
            >
              {isLoadingUser ? <Loader2 className="h-4 w-4 animate-spin" /> : '增加新地址'}
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
            onDelete={() => {
              const baseURL = getBaseURL(window.location.host)
              deleteAddress(baseURL, address.id || 0)
            }}
          />
        ))}
      </div>
    </main>
  )
}

export default ProfilePage
