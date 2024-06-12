'use client'

import EditEmailForm from '@/app/edit-email/EditEmailForm'

function EditEmailPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex min-h-15 items-center justify-between bg-white p-4"></header>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">請輸入您要綁定的資訊</span>

          <EditEmailForm />
        </div>
      </div>
    </main>
  )
}

export default EditEmailPage
