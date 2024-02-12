import { ChevronRight, Clock4, MapPin } from 'lucide-react'
import Image from 'next/image'
import PrevButton from '@/components/PrevButton'
import { Button } from '@/components/ui/button'

const DetailPage = () => {
  return (
    <main className="flex h-full min-h-screen flex-col">
      <section className="relative bg-gradient-to-r from-primary-alt to-primary pb-20 text-white">
        <div className="grid place-items-center gap-10 p-4">
          <div className="relative flex w-full flex-col gap-4">
            <PrevButton />

            <div className="flex w-full items-center justify-center">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center justify-center gap-2 text-lg md:text-2xl">
                    <Clock4 />
                    待付款
                  </span>
                  <span className="text-xs md:text-base">9分鐘後訂單關閉，請及時付款哦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-gray-50">
        <div className="relative -top-24 m-4 flex flex-col gap-2 rounded-xl bg-white p-4">
          <div className="flex flex-1 justify-between">
            <span className="flex flex-1 cursor-pointer items-center justify-between gap-2">
              <div className="h-full">
                <MapPin color="#f74843" />
              </div>

              <div className="flex flex-col gap-2 text-foreground">
                <span className="font-medium">北京市海淀區恆大新宏福苑西區20號樓2單元301</span>
                <span className="text-gray-400">丢丢 15800000000</span>
              </div>

              <ChevronRight />
            </span>
          </div>
        </div>
        <div className="relative -top-28 flex flex-1 flex-col">
          <div className="relative m-4 flex flex-col gap-2 rounded-xl bg-white p-4">
            <div className="flex flex-1 items-center justify-between gap-2">
              <div className="rounded-xl bg-default p-4">
                <Image
                  width={100}
                  height={100}
                  className="md:h-25 md:w-25 h-10 w-10"
                  src="https://img.freepik.com/free-psd/grape-fruits-isolated-transparent-background_191095-14703.jpg?w=1060&t=st=1707652451~exp=1707653051~hmac=65ed420c75cf93ae28e14b5f563205eff39194d323cb73ba78e7fae7fd00612d"
                  alt="蘋果"
                />
              </div>

              <div className="text-sm">
                <span>彩食有機鮮菠菜彩食新鮮的菠菜 1kg/份</span>
                <div className="flex flex-col text-gray-500">
                  <span>規格：1kg/份</span>
                  <span>數量：2份</span>
                </div>
              </div>

              <span>
                $<span className="text-lg font-bold">20.00</span>
              </span>
            </div>
          </div>

          <div className="relative m-4 mt-0 flex flex-col gap-2 rounded-xl bg-white p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">商品小計</span>
              <span>
                $<span className="text-lg font-bold">20.00</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between pb-2">
                <span className="text-gray-400">活動優惠</span>
                <span className="text-foreground">-$7</span>
              </div>

              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-foreground">應付金額總計</span>
                <span className="text-primary">
                  $<span className="text-lg font-bold">13.00</span>
                </span>
              </div>
            </div>
          </div>

          <div className="relative m-4 mt-0 flex flex-col gap-2 rounded-xl bg-white p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">下單時間</span>
              <span>2021.12.27 12:22:35</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">訂單編號</span>
              <span>83837423749237492</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">支付方式</span>
              <span>支付寶</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">交易流水號</span>
              <span>838374237492374921939</span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex min-h-16 justify-end bg-white shadow-2xl">
          <div className="grid grid-cols-2 gap-2 p-2">
            <Button
              variant="ghost"
              className="rounded-3xl border border-gray-400 p-2 text-gray-400 hover:text-gray-400"
            >
              取消訂單
            </Button>
            <Button
              variant="ghost"
              className="rounded-3xl border border-primary p-2 text-primary hover:bg-primary-foreground hover:text-primary"
            >
              去支付
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DetailPage
