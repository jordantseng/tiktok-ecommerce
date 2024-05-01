import CompanyInfo from '@/components/CompanyInfo'
import Title from '@/components/Title'
import { getBaseURL } from '@/lib/utils'
import { getWebSettings } from '@/services/webSettings'
import { headers } from 'next/headers'

const PrivacyPage = async () => {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)
  const { data: settings } = await getWebSettings(baseURL)

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Title title="隱私權政策" />
      <div className="flex flex-col justify-between gap-4 p-4 text-sm">
        <div>
          <div>
            歡迎您使用{settings.name}
            的服務！我們重視您的隱私，致力於保護您的個人信息安全。本隱私政策旨在透明化地解釋我們如何收集、使用、存儲、保護以及分享您的信息。
          </div>
          <div className="py-2 font-bold">信息收集</div>
          <div>我們可能會收集以下類型的個人信息：</div>
          <div className="p-2">
            <span>*身份信息：包括但不限於姓名、郵件地址、手機號碼。</span>
            <br />
            <span>*技術信息：包括但不限於IP地址、瀏覽器類型、訪問時間。</span>
            <br />
            <span>*使用信息：您如何使用我們的服務，包括但不限於點擊記錄、偏好設置。 使用信息</span>
            <br />
          </div>
          <div className="py-2 font-bold">使用信息</div>
          <div>我們使用收集的信息來：</div>
          <div className="p-2">
            <span>* 提供、維護和改進我們的服務。</span>
            <br />
            <span>* 進行客戶支持和回應您的請求。</span>
            <br />
            <span>* 進行研究和分析，以改善用戶體驗。</span>
            <br />
            <span>* 向您提供關於服務更新或促銷活動的信息。</span>
            <br />
          </div>
          <div className="py-2 font-bold">信息共享</div>
          <div>
            我們不會將您的個人信息出售給第三方。我們可能會在以下情況下與第三方分享您的信息：
          </div>
          <div className="p-2">
            <span>
              * 獲得您的同意後: 為了提供您請求的服務，例如：物流服務。 遵守法律要求或應對法律程序。
            </span>
            <br />
            <span>
              * 信息安全: 我們採取各種安全措施來保護您的個人信息，包括加密存儲、數據訪問控制等。
            </span>
          </div>
          <div className="py-2 font-bold">兒童隱私</div>
          <div>
            我們的服務不針對13歲以下的兒童。如果我們發現無意中收集了兒童的個人信息，我們將採取措施刪除這些信息。
          </div>
          <div className="py-2 font-bold">隱私政策的更改</div>
          <div>
            我們可能會不時更新我們的隱私政策。我們將通過適當的方式（例如，通過我們的網站）通知您任何重大變更。
          </div>
          <div className="py-2 font-bold">聯繫我們</div>
          <div>
            如果您對我們的隱私政策有任何疑問或擔憂，請通過{settings.tel || settings.mobile}
            與我們聯繫。
          </div>
        </div>
        <div>
          <div>
            Welcome to using {settings.name}.&apos;s services! We value your privacy and are
            committed to protecting the security of your personal information. This Privacy Policy
            aims to explain transparently how we collect, use, store, protect, and share your
            information.
          </div>
          <div className="py-2 font-bold">Information Collection</div>
          <div>We may collect the following types of personal information:</div>
          <div className="p-2">
            <span>
              *Identity Information: Including but not limited to name, email address, mobile
              number.
            </span>
            <br />
            <span>
              *Technical Information: Including but not limited to IP address, browser type, access
              times.
            </span>
            <br />
            <span>
              *Usage Information: How you use our services, including but not limited to click
              records, preference settings.
            </span>
            <br />
          </div>
          <div className="py-2 font-bold">Use of Information</div>
          <div>We use the collected information to:</div>
          <div className="p-2">
            <span>* Provide, maintain, and improve our services.</span>
            <br />
            <span>* Conduct customer support and respond to your requests.</span>
            <br />
            <span>* Conduct research and analysis to improve user experience.</span>
            <br />
            <span>
              * Provide you with information about service updates or promotional activities.
            </span>
            <br />
          </div>
          <div className="py-2 font-bold">Information Sharing</div>
          <div>
            We do not sell your personal information to third parties. We may share your information
            with third parties in the following circumstances:
          </div>
          <div className="p-2">
            <span>
              With your consent. To provide the services you requested, such as logistics services.
              To comply with legal requirements or respond to legal proceedings.
            </span>
            <br />
            <span>
              Information Security We take various security measures to protect your personal
              information, including encrypted storage, data access control, etc.
            </span>
          </div>
          <div className="py-2 font-bold">Child Privacy</div>
          <div>
            Our services are not targeted at children under the age of 13. If we find that we have
            inadvertently collected personal information from children, we will take steps to delete
            this information.
          </div>
          <div className="py-2 font-bold">Changes to the Privacy Policy</div>
          <div>
            We may update our Privacy Policy from time to time. We will notify you of any
            significant changes in an appropriate manner (for example, through our website).
          </div>
          <div className="py-2 font-bold">Contact Us</div>
          <div>
            If you have any questions or concerns about our Privacy Policy, please contact us at{' '}
            {settings.tel || settings.mobile}.
          </div>
        </div>
      </div>
      <CompanyInfo settings={settings} />
    </main>
  )
}

export default PrivacyPage
