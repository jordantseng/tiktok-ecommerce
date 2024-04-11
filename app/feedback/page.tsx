'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '@/context/AuthContext'
import { getMemberFeedbacks } from '@/services/feedback'
import { FeedbackData } from '@/services/feedback'
import { getBaseURL } from '@/lib/utils'

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    const fetchMemberFeedbacks = async () => {
      const { data: memberFeedbacks } = await getMemberFeedbacks(baseURL)
      setFeedbacks(memberFeedbacks)
    }

    fetchMemberFeedbacks()
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <pre>{JSON.stringify(feedbacks, null, 2)}</pre>
    </main>
  )
}

export default FeedbackPage
