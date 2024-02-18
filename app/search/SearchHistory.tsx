'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

const SearchHistory = () => {
  const [historyTerms, setHistoryTerms] = useState<string[]>([])
  const router = useRouter()

  const stringifiedHistoryTerms = localStorage.getItem('historyTerms') ?? '[]'

  useEffect(() => {
    const historyTerms = JSON.parse(stringifiedHistoryTerms) as string[]

    setHistoryTerms(historyTerms)
  }, [stringifiedHistoryTerms])

  const handleClick = (term: string) => {
    router.push(`/search?page=1&q=${term}`)
  }

  const handleClearHistoryTerms = () => {
    localStorage.removeItem('historyTerms')
    setHistoryTerms([])
  }

  return (
    <>
      <div className="flex justify-between">
        <h4 className="mb-2 scroll-m-20 text-xl font-normal tracking-tight">歷史搜索</h4>
        <button onClick={handleClearHistoryTerms}>
          <Trash2Icon className="text-gray-400" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {historyTerms.map((term, index) => (
          <Badge
            className="rounded-xl"
            variant="secondary"
            key={index}
            onClick={() => handleClick(term)}
          >
            {term}
          </Badge>
        ))}
      </div>
    </>
  )
}

export default SearchHistory
