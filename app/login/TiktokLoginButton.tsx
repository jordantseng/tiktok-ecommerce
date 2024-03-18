import { useAuthContext } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

function TiktokLoginButton() {
  const { handleLoginTiktok } = useAuthContext()
  return (
    <Avatar
      onClick={handleLoginTiktok}
      className="h-12 w-12 cursor-pointer border-2 bg-black p-2 md:h-16 md:w-16"
    >
      <AvatarImage src="/tiktok-logo.svg" alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-12 w-12 md:h-20 md:w-20" />
      </AvatarFallback>
    </Avatar>
  )
}

export default TiktokLoginButton
