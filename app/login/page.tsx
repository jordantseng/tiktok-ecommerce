import PrevButton from '@/components/PrevButton'

const LoginPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 min-h-15">
        <PrevButton />
      </header>
      Login
    </main>
  )
}

export default LoginPage
