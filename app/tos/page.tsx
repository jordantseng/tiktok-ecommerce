import Title from '@/components/Title'
import { getBaseURL } from '@/lib/utils'
import { getWebSettings } from '@/services/webSettings'
import { headers } from 'next/headers'

const TosPage = async () => {
  const headerList = headers()
  const baseURL = getBaseURL(headerList.get('host')!)
  const { data: settings } = await getWebSettings(baseURL)

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Title title="服務條款" goBackUrl="/" />
      <div className="flex flex-col justify-between gap-4 p-4 text-sm">
        <div>
          <div>
            歡迎您使用潮數位科技有限公司的服務！我們提供的服務旨在提供高品質的線上購物體驗。使用我們的服務即表示您同意遵守本服務條款，請仔細閱讀。
          </div>
          <div className="py-2 font-bold">使用條件</div>
          <div>您必須同意不會使用本服務進行任何非法活動，也不會違反任何適用的法律或規章政策。</div>
          <div className="py-2 font-bold">註冊要求</div>
          <div>
            使用某些服務可能需要註冊。在註冊過程中，您同意提供真實、準確、最新和完整的資訊。
          </div>
          <div className="py-2 font-bold">使用者內容</div>
          <div>
            您對於透過服務傳播的任何內容負責，包括但不限於文字、圖片、音訊和視訊。您同意不張貼任何違法或侵權的內容。
          </div>
          <div className="py-2 font-bold">服務變更與終止</div>
          <div>我們保留隨時修改或終止服務（或其任何部分）的權利，並將盡力提前通知。</div>
          <div className="py-2 font-bold">免責聲明</div>
          <div>我們的服務是以「現況」提供，不提供任何形式的明示或暗示保證。</div>
          <div className="py-2 font-bold">限制責任</div>
          <div>
            潮數位科技有限公司對於因使用或無法使用服務所導致的任何間接、特殊、偶然或衍生性損害不承擔責任。
          </div>
          <div className="py-2 font-bold">智慧財產</div>
          <div>
            服務及其中的內容（包括但不限於軟體、圖像、文字和設計）是潮數位科技有限公司的財產，受到著作權、商標和其他智慧財產權法律的保護。
          </div>
          <div className="py-2 font-bold">法律適用與爭議解決</div>
          <div>
            這些條款的解釋和執行將遵守中國台灣地區的法律。任何因這些條款或服務所生的爭議，雙方應先力求友好協商解決。
          </div>
          <div className="py-2 font-bold">修改與更新</div>
          <div>我們保留隨時修改這些條款的權利，並將盡量透過適當管道通知您。</div>
          <div className="py-2 font-bold">聯絡方式</div>
          <div>如有任何問題或建議，請透過02-66043975與我們聯繫。</div>
          <div className="py-2 font-bold">隱私權政策</div>
          <div>
            我們重視您的隱私權。請參閱我們的隱私權政策，以了解有關我們如何收集、使用和保護您的個人資訊的詳細資訊。
          </div>
          <div className="py-2 font-bold">使用者行為準則</div>
          <div>
            使用者必須遵守高標準的行為準則，不得在平台上發布任何違法、濫用、侵犯他人權利的內容，包括但不限於仇恨言論和色情內容。
          </div>
          <div className="py-2 font-bold">帳號安全</div>
          <div>用戶有責任保持其帳號的安全性，並對所有透過其帳號進行的活動負責。</div>
          <div className="py-2 font-bold">第三方連結</div>
          <div>
            本服務可能包含第三方網站或服務的連結。潮數位科技有限公司對這些外部資源的內容不負任何責任。
          </div>
          <div className="py-2 font-bold">年齡限制</div>
          <div>
            服務的最低使用年齡為13歲。未滿13歲的使用者必須在父母或法定監護人的指導下使用服務。
          </div>
          <div className="py-2 font-bold">版權政策和內容投訴</div>
          <div>
            如您認為您的作品被侵犯，請聯絡我們進行版權投訴。我們遵循適用的版權法律進行處理。
          </div>
          <div className="py-2 font-bold">服務費用和支付</div>
          <div>若服務包含收費功能，我們將明確費用、付款方式、退款政策和訂閱取消流程。</div>
          <div className="py-2 font-bold">終端使用者授權協議(EULA)</div>
          <div>若服務包含軟體下載，使用者將獲得非排他性的軟體使用權，該權利受到本條款的限制。</div>
          <div className="py-2 font-bold">更新和修改的通知</div>
          <div>
            對於TOS的任何更新或修改，我們將透過電子郵件、服務內通知或網站公告等方式通知使用者。
          </div>
          <div>接受這些條款，您確認您已閱讀、瞭解並同意受以上所有條款的約束。</div>
        </div>
        <div>
          <div>
            Welcome to using the services provided by HyperDigital Technology Co., Ltd.! Our
            services aim to offer a high-quality online shopping experience. By using our services,
            you agree to comply with these Terms of Service, so please read them carefully.
          </div>
          <div className="py-2 font-bold">Terms of Use</div>
          <div>
            You must agree not to use the services for any illegal activities, nor to violate any
            applicable laws or regulations.
          </div>
          <div className="py-2 font-bold">Registration Requirements</div>
          <div>
            Some services may require registration. During the registration process, you agree to
            provide true, accurate, up-to-date, and complete information.
          </div>
          <div className="py-2 font-bold">User Content</div>
          <div>
            You are responsible for any content disseminated through the service, including but not
            limited to text, images, audio, and video. You agree not to post any content that is
            illegal or infringes on others rights.
          </div>
          <div className="py-2 font-bold">Service Changes and Termination</div>
          <div>
            We reserve the right to modify or terminate the service (or any part thereof) at any
            time, and we will make every effort to notify you in advance.
          </div>
          <div className="py-2 font-bold">Disclaimer</div>
          <div>
            Our services are provided &quot;as is&quot; without any form of express or implied
            warranty.
          </div>
          <div className="py-2 font-bold">Limitation of Liability</div>
          <div>
            HyperDigital Technology Co., Ltd. is not liable for any indirect, special, incidental,
            or consequential damages arising from the use or the inability to use the services.
          </div>
          <div className="py-2 font-bold">Intellectual Property</div>
          <div>
            The service and its content (including but not limited to software, images, text, and
            designs) are the property of HyperDigital Technology Co., Ltd., protected by copyright,
            trademark, and other intellectual property laws.
          </div>
          <div className="py-2 font-bold">Governing Law and Dispute Resolution</div>
          <div>
            The interpretation and enforcement of these terms will be governed by the laws of
            Taiwan, China. Any disputes arising from these terms or services should first be
            resolved through friendly negotiation.
          </div>
          <div className="py-2 font-bold">Modifications and Updates</div>
          <div>
            We reserve the right to modify these terms at any time and will make every effort to
            notify you through appropriate channels.
          </div>
          <div className="py-2 font-bold">Contact Information</div>
          <div>If you have any questions or suggestions, please contact us at 02-66043975.</div>
          <div className="py-2 font-bold">Privacy Policy</div>
          <div>
            We value your privacy. Please refer to our Privacy Policy for detailed information on
            how we collect, use, and protect your personal information.
          </div>
          <div className="py-2 font-bold">User Conduct</div>
          <div>
            Users must adhere to high standards of conduct and not post any illegal, abusive, or
            rights-infringing content on the platform, including but not limited to hate speech and
            pornographic content.
          </div>
          <div className="py-2 font-bold">Account Security</div>
          <div>
            Users are responsible for maintaining the security of their accounts and are liable for
            all activities conducted through their accounts.
          </div>
          <div className="py-2 font-bold">Third-Party Links</div>
          <div>
            The service may contain links to third-party websites or services. HyperDigital
            Technology Co., Ltd. is not responsible for the content of these external resources.
          </div>
          <div className="py-2 font-bold">Age Restrictions</div>
          <div>
            The minimum age to use the service is 13 years. Users under 13 must use the service
            under the guidance of a parent or legal guardian.
          </div>
          <div className="py-2 font-bold">Copyright Policy and Content Complaints</div>
          <div>
            If you believe your work has been infringed, please contact us for copyright complaints.
            We follow applicable copyright laws in handling such complaints.
          </div>
          <div className="py-2 font-bold">Service Fees and Payment</div>
          <div>
            If the service includes paid features, we will clearly specify the fees, payment
            methods, refund policies, and subscription cancellation processes.
          </div>
          <div className="py-2 font-bold">End-User License Agreement (EULA)</div>
          <div>
            If the service includes software downloads, users will receive a non-exclusive right to
            use the software, subject to the limitations of these terms.
          </div>
          <div className="py-2 font-bold">Notification of Updates and Modifications</div>
          <div>
            For any updates or modifications to the TOS, we will notify users via email, in-service
            notifications, or website announcements.
          </div>
          <div>
            By accepting these terms, you confirm that you have read, understood, and agreed to be
            bound by all of the above terms.
          </div>
        </div>
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

export default TosPage
