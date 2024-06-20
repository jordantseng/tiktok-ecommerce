import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useLineAuthContext } from '@/context/LineAuthContext'

function LineLoginButton() {
  const { isLiffInit, handleLineLogin } = useLineAuthContext()
  return isLiffInit ? (
    <Avatar
      onClick={handleLineLogin}
      className="h-12 w-12 cursor-pointer border-2 bg-[#06C755] p-2 md:h-16 md:w-16"
    >
      <AvatarImage src="/line-logo.svg" alt="@shadcn" />
      <AvatarFallback>
        <Skeleton className="h-12 w-12 md:h-20 md:w-20" />
      </AvatarFallback>
    </Avatar>
  ) : (
    <Skeleton className="h-12 w-12 rounded-full md:h-16 md:w-16" />
  )
}

export default LineLoginButton
