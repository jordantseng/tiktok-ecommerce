type IconCardProps = {
  title: string
  Icon: React.ReactNode
}

const IconCard = ({ title, Icon }: IconCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between">
      {Icon}
      <h4 className="text-md mb-2 scroll-m-20 font-normal tracking-wider">{title}</h4>
    </div>
  )
}

export default IconCard
