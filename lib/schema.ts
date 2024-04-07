import { z } from 'zod'

export const emailSchema = z.string().email('請輸入正確的 Email 格式')

export const passwordSchema = z
  .string()
  .min(8, '密碼長度至少 8 個字元')
  .regex(/[A-Z]/, '密碼必須包含大寫字母')
  .regex(/[a-z]/, '密碼必須包含小寫字母')
  .regex(/[0-9]/, '密碼必須包含數字')
  .regex(/[@#$%^&*()<>/|}{~:]/, '密碼必須包含特殊符號')
