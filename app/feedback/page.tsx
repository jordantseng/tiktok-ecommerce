'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '@/context/AuthContext'
import { getMemberFeedbacks } from '@/services/feedback'
import { FeedbackData } from '@/services/feedback'

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])

  useEffect(() => {
    const fetchMemberFeedbacks = async () => {
      const { data: memberFeedbacks } = await getMemberFeedbacks(1)
      setFeedbacks(memberFeedbacks)
    }

    fetchMemberFeedbacks()
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-default">
      <pre>{JSON.stringify(feedbacks, null, 2)}</pre>
    </main>
  )
}

export default FeedbackPage
