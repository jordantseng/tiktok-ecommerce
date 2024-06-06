import * as React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useImmer } from 'use-immer'

type Props = {
  self?: boolean
  editable?: boolean
  msg?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit?: () => void
}

const MessageItem = ({ editable, self, msg, onChange, onSubmit }: Props) => {
  return (
    <>
      <div className="m-auto flex w-full space-x-2 p-4">
        <div className="flex items-center">
          {!self && (
            <Image
              src="/headphones.svg"
              height={30}
              width={30}
              alt=""
              className={cn('h-8 w-8 rounded-full border p-1', { ' bg-primary opacity-50': !self })}
            />
          )}
        </div>
        <div
          className={cn('relative mb-2 w-full rounded-lg after:absolute after:content-[""]', {
            'after:border-b-none after:border-l-none bg-primary opacity-50 after:bottom-[-29px] after:left-[20px] after:border-r-[30px] after:border-t-[30px] after:border-r-transparent after:border-t-primary':
              !self,
            'border border-primary bg-white after:bottom-[-16px] after:left-[250px] after:h-[30px] after:w-[30px] after:rotate-[90deg] after:skew-x-[-45deg] after:border-r-[1px] after:border-t-[1px] after:border-r-primary after:border-t-primary after:bg-white':
              self && !editable,
            'w-[80%]': !editable,
          })}
          {...(self && { style: { marginLeft: 'auto' } })}
        >
          {editable ? (
            <Textarea
              value={msg}
              className="bg-white"
              placeholder="請在此處留言送出,店家將會看到並回覆"
              onChange={(e) => onChange && onChange(e)}
            />
          ) : (
            <p className={cn('p-4 pb-7', { 'text-white': !self })}>
              {!self ? '商家：' : '我：'}
              {msg}
            </p>
          )}
        </div>
        {self && !editable && (
          <Image
            src="/profile-user.svg"
            height={30}
            width={30}
            alt=""
            className={cn('h-8 w-8 rounded-full border p-1', { ' bg-primary opacity-50': !self })}
          />
        )}
      </div>
      {editable && (
        <Button
          className="width-auto ml-auto mr-4 bg-primary"
          disabled={!msg}
          size="sm"
          onClick={() => onSubmit && onSubmit()}
        >
          傳送
        </Button>
      )}
    </>
  )
}

export default MessageItem
