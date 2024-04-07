import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getToken() {
  return (typeof window !== 'undefined' && localStorage.getItem('token')) || ''
}

const DEV_ENV_DOMAIN = 'localhost:3000'
const TEST_ENV_DOMAIN = 'https://front.tkshop.live'

export function getCurrentDomain(host: string) {
  const domain = host === DEV_ENV_DOMAIN || host === TEST_ENV_DOMAIN ? 'test.tkshop.live' : host

  return domain
}
