'use client'

import { Trash2Icon } from 'lucide-react'

const SearchHistory = () => {
  return (
    <div className="flex justify-between">
      <h4 className="mb-2 scroll-m-20 text-xl font-normal tracking-tight">歷史搜索</h4>
      <button>
        <Trash2Icon className="text-gray-400" />
      </button>
    </div>
  )
}

export default SearchHistory
