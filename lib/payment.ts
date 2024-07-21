import { WebSettingsData } from '@/types/common'

export const deliveryMap = {
  HOME_DELIVERY: '宅配到府',
  FAMIC2C: '超商取貨-全家',
  UNIMARTC2C: '超商取貨-7-11',
  // HILIFEC2C: '超商取貨-萊爾富',
}

export const handleLabel = (val: string | null, webSettingsData: WebSettingsData | null) => {
  if (!val) return ''
  if (webSettingsData?.paykind[val] === '信用卡') {
    return '信用卡一次付清'
  } else if (val.indexOf('atm') > -1) {
    return 'ATM轉帳'
  } else {
    return webSettingsData?.paykind[val] ?? '尚未選擇付款方式'
  }
}

export const handleFee = (
  webSettingsData: WebSettingsData | null,
  total: number,
  isCvs: boolean,
) => {
  const logisticPrice = isCvs
    ? webSettingsData?.logisticprice_cvs
    : webSettingsData?.logisticprice_home

  return webSettingsData?.freelogisticprice && total > webSettingsData.freelogisticprice
    ? 0
    : logisticPrice || 0
}
