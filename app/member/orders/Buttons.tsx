'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'

type ButtonProps = {
  children: string
  onClick: () => void
}

export const PrimaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="min-w-20 rounded-3xl border border-primary p-2 text-primary hover:bg-primary-foreground hover:text-primary"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export const SecondaryButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="hover:whit-blue-400 min-w-20 rounded-3xl border border-blue-400 p-2 text-blue-400 hover:bg-blue-100 hover:text-blue-400"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export const CommonButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="min-w-20 rounded-3xl border border-foreground p-2 text-foreground hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500"
      onClick={onClick}
    >
      {children}
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
