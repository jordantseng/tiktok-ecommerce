import Title from '@/components/Title'
import { getQNAs } from '@/services/qna'
import { getPage } from '@/services/page'
import CollapsibleTab from '@/app/info/CollapsibleTab'
import InfoList from '@/app/info/InfoList'
import { getWebSettings } from '@/services/webSettings'

type InfoPageProps = {
  searchParams: {
    type: string
    typeId: string
  }
}

const InfoPage = async ({ searchParams }: InfoPageProps) => {
  const { type, typeId } = searchParams
  const { data: details } = type === '常見問題' ? await getQNAs() : await getPage(Number(typeId))
  const { data: settings } = await getWebSettings()

  return (
    <main className="flex min-h-screen flex-col bg-default">
      <Title title={type || '服務中心'} />
      <div className="flex flex-col justify-between gap-4 p-4 text-sm">
        {!type ? (
          <InfoList />
        ) : (
          <>
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
          </>
        )}
        <div className="flex flex-col gap-2 p-4 text-gray-700">
          <span>公司名稱：{settings.title}</span>
          <span>公司地址：台北市中山北路二段 33 號</span>
          <span>聯繫方式：{settings.mobile}</span>
          <span>信箱：{settings.email}</span>
        </div>
      </div>
    </main>
  )
}

export default InfoPage
