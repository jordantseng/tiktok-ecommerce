'use client'

import Title from '@/components/Title'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import { useEffect } from 'react'

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

type AvatarPageProps = {
  params: {
    id: string
  }
}

function AvatarPage({ params }: AvatarPageProps) {
  const { id } = params
  const { user, isLoadingUser, refreshUser } = useAuthContext()

  console.log('user: ', user)

  useEffect(() => {
    if (!user) {
      refreshUser()
    }
  }, [user, refreshUser])

  function handleUpload() {
    console.log('upload')
  }

  return (
    <main className="min-h-screen bg-background">
      <Title title="頭像" />

      <section className="grid place-items-center p-4">
        <div className="grid w-full place-items-center gap-4 rounded-lg bg-white p-4">
          <div className="text-xl font-medium">
            {!user || isLoadingUser ? <Skeleton className="h-7 w-24" /> : <span>ID: {id}</span>}
          </div>
          <div className="grid cursor-pointer place-items-center gap-4" onClick={handleUpload}>
            {user ? <AvatarDemo /> : <Skeleton className="h-48 w-48 rounded-full" />}
            <div className="text-xl text-gray-500 underline">
              {!user || isLoadingUser ? <Skeleton className="h-7 w-24" /> : '上傳頭像'}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AvatarPage
