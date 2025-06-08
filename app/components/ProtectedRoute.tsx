import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner' // Replace with your loading component
import { Skeleton } from '@/components/ui/skeleton'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(router.asPath))
    }
  }, [status, router])

  if (status === 'loading') {
    return <Skeleton className='h-screen w-full'/> // Minimal loading state for fast perceived performance
  }

  if (status === 'authenticated') {
    return <>{children}</>
  }

  return null
}

export default ProtectedRoute