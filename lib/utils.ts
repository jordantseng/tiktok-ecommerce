import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getToken() {
  return (typeof window !== 'undefined' && localStorage.getItem('token')) || ''
}

const DEV_ENV_DOMAIN = 'localhost:'
const TEST_ENV_DOMAIN = 'front.tkshop.live'

export function getCurrentDomain(host: string) {
  const prefix = host.split('.')[0]
  const domain =
    host.includes(DEV_ENV_DOMAIN) || host === TEST_ENV_DOMAIN
      ? 'https://test.tkshop.live'
      : `https://${prefix}.tkback.app`

  return domain
}
