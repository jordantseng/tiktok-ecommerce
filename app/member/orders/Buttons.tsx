'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type ButtonProps = {
  children: string
  onClick: () => void
  isLoading?: boolean
}

export const PrimaryButton = ({ children, onClick, isLoading }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="min-w-20 rounded-3xl border border-primary p-2 text-primary hover:bg-primary-foreground hover:text-primary"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}

export const SecondaryButton = ({ children, onClick, isLoading }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="hover:whit-blue-400 min-w-20 rounded-3xl border border-blue-400 p-2 text-blue-400 hover:bg-blue-100 hover:text-blue-400"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}

export const CommonButton = ({ children, onClick, isLoading }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="min-w-20 rounded-3xl border border-foreground p-2 text-foreground hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}

type ButtonType = 'primary' | 'secondary' | 'common'
type ButtonMap = Record<ButtonType, FC<ButtonProps>>

export const buttonMap: ButtonMap = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  common: CommonButton,
}
