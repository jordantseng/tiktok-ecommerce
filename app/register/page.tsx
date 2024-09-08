import PrevButton from '@/components/PrevButton'
import EmailRegisterForm from '@/app/register/EmailRegisterForm'
import LoginLink from '@/app/register/LoginLink'

type RegisterPageProps = {
  searchParams: {
    type: string
  }
}

const RegisterPage = ({ searchParams }: RegisterPageProps) => {
  const type = searchParams.type

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4">
        <PrevButton />
      </header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">{type === 'binding' ? '綁定' : '註冊'}</span>

          <EmailRegisterForm />

          {type !== 'binding' && (
            <div className="flex w-full">
              <LoginLink />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
