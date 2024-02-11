'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Title from '@/components/Title'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { useImmer } from 'use-immer'

function AvatarDemo() {
  return (
    <Avatar className="h-12 w-12 border-2">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

function Card() {
  return (
    <section className="flex items-center justify-between gap-2 rounded-xl bg-white p-2">
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-foreground text-primary">
            家
          </span>
          <p>丟丟</p>
          <p>1580000000000</p>
        </span>
        <span className="text-gray-500">北京市海定區環大福苑西區 20 號 2 樓</span>
      </div>
      <ExternalLink className="text-gray-500" />
    </section>
  )
}

type LabelMap = {
  nickname: string
  uid: string
  phone: string
  password: string
}

const labelMap: LabelMap = {
  nickname: '暱稱',
  uid: '身分證字號',
  phone: '電話',
  password: 'E-mail',
}

const ProfilePage = () => {
  const [formValues, setFormValues] = useImmer<LabelMap>({
    nickname: '丟丟不丟',
    uid: '123456789',
    phone: '0912345678',
    password: '123321',
  })

  const fields = Object.entries(formValues) as [keyof LabelMap, string][]

  return (
    <main className="min-h-screen bg-default">
      <Title title="個人中心" goBackUrl="/member" />

      <div className="flex flex-col gap-2 p-4">
        <form className="flex w-full flex-col divide-y divide-secondary rounded-lg bg-white">
          <div className="flex items-center justify-between p-4 py-2">
            <span>頭像</span>
            <span className="flex items-center gap-2">
              <AvatarDemo />
              <ChevronRight className="text-gray-500" />
            </span>
          </div>

          {fields.map(([key, value]) => (
            <div key={key} className="flex min-h-16 items-center justify-between p-4 py-2">
              <span>{labelMap[key]}</span>
              <span>{value}</span>
            </div>
          ))}
        </form>

        <Card />
        <Card />
      </div>
    </main>
  )
}

export default ProfilePage
