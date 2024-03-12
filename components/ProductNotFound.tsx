import Image from 'next/image'
import React from 'react'

const ProductNotFound = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <Image src="/not-found.svg" className="size-32" height={40} width={40} alt="" />
      <h5 className="text-gray-500">抱歉，没有找到商品哦</h5>
    </div>
  )
}

export default ProductNotFound
