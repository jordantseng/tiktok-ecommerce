function RecommendTitle() {
  return (
    <div className="flex items-center gap-2 font-semibold text-gray-900">
      <span className="flex">
        <div className="rounded-full-percent relative -bottom-1 h-1 w-[7px] -rotate-[60deg] bg-gradient-to-r from-orange-500 to-orange-300 md:scale-125" />
        <div className="rounded-full-percent h-2 w-[13px] -rotate-[65deg] bg-gradient-to-r from-orange-500 to-orange-300 md:scale-105" />
      </span>
      為你推薦
      <span className="flex">
        <div className="rounded-full-percent h-2 w-[13px] rotate-[65deg] bg-gradient-to-r from-orange-500 to-orange-300 md:scale-105" />
        <div className="rounded-full-percent relative -bottom-1 h-1 w-[7px] rotate-[60deg] bg-gradient-to-r from-orange-500 to-orange-300 md:scale-125" />
      </span>
    </div>
  )
}

export default RecommendTitle
