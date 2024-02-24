'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AddressData } from '@/types/common'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const formSchema = z.object({
  name: z.string().min(1, { message: '姓名為必填' }),
  tel: z.string().min(1, { message: '電話為必填' }),
  city1: z.string(),
  city2: z.string(),
  address: z.string(),
  CVSStoreName: z.string(),
  CVSAddress: z.string(),
})

type Props = {
  value: AddressData
  cities: string[]
  districts: string[]
  onGetDistrict: (val: string) => void
  onSubmit: (val: AddressData) => void
}

const ReceiptForm = ({ value, cities = [], districts = [], onGetDistrict, onSubmit }: Props) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tel: '',
      city1: '',
      city2: '',
      address: '',
      CVSStoreName: '',
      CVSAddress: '',
    },
  })

  useEffect(() => {
    if (value.CVSStoreName && value.CVSAddress) {
      form.setValue('CVSStoreName', value.CVSStoreName)
      form.setValue('CVSAddress', value.CVSAddress)
    }
    if (value.city1) {
      form.setValue('city1', value.city1)
      onGetDistrict(value.city1)
    }
    value.name && form.setValue('name', value.name)
    value.tel && form.setValue('tel', value.tel)
    value.city2 && form.setValue('city2', value.city2)
    value.address && form.setValue('address', value.address)
  }, [form, onGetDistrict, value])

  // 2. Define a submit handler.
  function handleSubmit(result: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onSubmit({ ...value, ...result })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>*收件人</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>*電話</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {value.LogisticsSubType === 'HOME_DELIVERY' && (
          <>
            <FormField
              control={form.control}
              name="city1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>縣市</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val)
                      onGetDistrict(val)
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="請選擇..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full bg-white">
                      {cities.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>鄉鎮區</FormLabel>
                  {districts.length > 0 ? (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="請選擇..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full bg-white">
                        {districts.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Skeleton className="h-10 w-full" />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*地址</FormLabel>
                  <FormControl>
                    <Input className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {value.LogisticsSubType !== 'HOME_DELIVERY' && (
          <>
            <FormField
              control={form.control}
              name="CVSStoreName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>店家名稱</FormLabel>
                  <FormControl>
                    <Input disabled className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CVSAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>店家地址</FormLabel>
                  <FormControl>
                    <Input disabled className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="mt-15 flex w-full rounded-3xl">
          {value.id ? '更新' : '新增'}
        </Button>
      </form>
    </Form>
  )
}

export default ReceiptForm
