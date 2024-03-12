'use client'

import Title from '@/components/Title'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import { ChangeEvent, useEffect, useState } from 'react'

function AvatarDemo({ src }: { src?: string }) {
  return (
    <Avatar className="h-48 w-48 border-4">
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-48 w-48" />
      </AvatarFallback>
    </Avatar>
  )
}

type AvatarPageProps = {}

function AvatarPage({}: AvatarPageProps) {
  const { user, isLoadingUser, refreshUser } = useAuthContext()
  const [imgUrl, setImgUrl] = useState<string | undefined>()

  useEffect(() => {
    if (!user) {
      refreshUser()
    }
  }, [user, refreshUser])

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImgUrl(url)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Title title="頭像" />

      <section className="grid place-items-center p-4">
        <div className="grid w-full place-items-center gap-4 rounded-lg bg-white p-4">
          <div className="text-xl font-medium">
            {!user || isLoadingUser ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <span>ID: {user.id}</span>
            )}
          </div>
          <div className="grid place-items-center gap-4 overflow-hidden">
            {user ? (
              <AvatarDemo src={user.img || imgUrl} />
            ) : (
              <Skeleton className="h-48 w-48 rounded-full" />
            )}
            <div className="text-xl text-gray-500 underline">
              {!user || isLoadingUser ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <>
                  <label className="cursor-pointer" htmlFor="avatar">
                    上傳頭像
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AvatarPage
