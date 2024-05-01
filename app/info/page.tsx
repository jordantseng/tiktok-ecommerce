import Title from '@/components/Title'
import { getQNAs } from '@/services/qna'
import { getPage } from '@/services/page'
import CollapsibleTab from '@/app/info/CollapsibleTab'
import InfoList from '@/app/info/InfoList'
import { getWebSettings } from '@/services/webSettings'
import { headers } from 'next/headers'
import { getBaseURL } from '@/lib/utils'
import PrevButton from '@/components/PrevButton'

type InfoPageProps = {
  searchParams: {
    type: string
    typeId: string
  }
}

const InfoPage = async ({ searchParams }: InfoPageProps) => {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)
  const { type, typeId } = searchParams
  const { data: details } =
    type === '常見問題' ? await getQNAs(baseURL) : await getPage(baseURL, Number(typeId))
  const { data: settings } = await getWebSettings(baseURL)

  return (
    <main className="h-full min-h-screen bg-background">
      <Title title={type || '服務中心'} />
      <div className={'flex h-[calc(100vh-250px)] w-full flex-col items-center'}>
        {!type ? (
          <InfoList />
        ) : (
          <div className="w-full space-y-4 p-4">
            {Array.isArray(details) && type === '常見問題' ? (
              details.map(({ id, title, body }) => (
                <CollapsibleTab key={id} title={title} body={body} />
              ))
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: (!Array.isArray(details) && details?.body) || '',
                }}
              />
            )}
          </div>
        )}
      </div>
      <footer className="flex flex-col gap-2 p-4 text-gray-700">
        {settings.title && <span>公司名稱：{settings.title}</span>}
        {settings.address && <span>公司地址：{settings.address}</span>}
        {settings.mobile && <span>聯繫方式：{settings.mobile}</span>}
        {settings.email && <span>信箱：{settings.email}</span>}
      </footer>
    </main>
  )
}

export default InfoPage
