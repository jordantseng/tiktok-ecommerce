import { WebSettingsData } from '@/types/common'

type Props = {
  settings: WebSettingsData
}

const CompanyInfo = async ({ settings }: Props) => {
  return (
    <footer className="flex flex-col gap-2 p-4 text-gray-700">
      {settings.name && <span>公司名稱：{settings.name}</span>}
      {settings.invoice && <span>統一編號：{settings.invoice}</span>}
      {settings.email && <span>信箱：{settings.email}</span>}
      {settings.address && <span>公司地址：{settings.address}</span>}
      {settings.tel && <span>聯繫電話：{settings.tel}</span>}
      {settings.mobile && <span>聯繫手機：{settings.mobile}</span>}
    </footer>
  )
}

export default CompanyInfo
