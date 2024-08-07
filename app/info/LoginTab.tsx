'use client'

import { useRouter } from 'next/navigation'
import { ChevronRightIcon } from 'lucide-react'

import { useAuthContext } from '@/context/AuthContext'
import { useNavigationContext } from '@/context/NavigationContext'
import { useLineAuthContext } from '@/context/LineAuthContext'

const LoginTab = () => {
  const router = useRouter()
  const { isLogin, handleLogout } = useAuthContext()
  const { liffObject, handleLineLogout } = useLineAuthContext()
  const { setFromPath } = useNavigationContext()

  function toggleLogin() {
    if (isLogin) {
      handleLogout()
      if (liffObject?.isLoggedIn()) {
        handleLineLogout()
      }
    } else {
      setFromPath('/')
      router.push('/login')
    }
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4"
      onClick={toggleLogin}
    >
      <span className="font-semibold">{isLogin ? '登出' : '登錄/註冊'}</span>
      <ChevronRightIcon />
    </div>
  )
}

export default LoginTab
