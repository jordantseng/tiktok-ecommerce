'use client'

import { ScrollText } from 'lucide-react'

const NoOrder = () => (
  <div className="m-auto flex flex-1 flex-col items-center justify-center gap-8">
    <ScrollText color="#e8dad9" size={100} />
    <h4 className="text-center text-gray-500">抱歉，沒有找到訂單哦！</h4>
  </div>
)

export default NoOrder
