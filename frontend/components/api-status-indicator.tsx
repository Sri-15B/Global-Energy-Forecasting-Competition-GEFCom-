'use client'

import { useEffect, useState } from 'react'
import { checkApiStatus, type ApiStatus } from '@/lib/api-status'
import { Card } from '@/components/ui/card'

const statusConfig = {
  online: { label: 'Online', color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-400' },
  slow: { label: 'Slow', color: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-400' },
  offline: { label: 'Offline', color: 'bg-red-500', textColor: 'text-red-700 dark:text-red-400' },
}

export function ApiStatusIndicator() {
  const [status, setStatus] = useState<ApiStatus>('online')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkApiStatus().then(setStatus).finally(() => setLoading(false))
    const interval = setInterval(() => {
      checkApiStatus().then(setStatus)
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const config = statusConfig[status]

  return (
    <Card className="p-3 flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${config.color} ${loading ? 'animate-pulse' : ''}`} />
      <div>
        <p className="text-xs font-medium">Backend API</p>
        <p className={`text-sm font-bold ${config.textColor}`}>{config.label}</p>
      </div>
    </Card>
  )
}
