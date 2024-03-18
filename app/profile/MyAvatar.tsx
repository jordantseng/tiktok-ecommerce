import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

function MyAvatar({ src }: { src?: string }) {
  return (
    <Avatar className="h-8 w-8 border-2 md:h-10 md:w-10">
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-8 w-8 md:h-10 md:w-10" />
      </AvatarFallback>
    </Avatar>
  )
}

export default MyAvatar
