'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginPage from './login/page'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const isLoggedIn = localStorage.getItem('gefcom_user')
    if (isLoggedIn) {
      router.push('/dashboard')
    }
  }, [router])

  return <LoginPage />
}
