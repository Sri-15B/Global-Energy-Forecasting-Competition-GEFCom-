'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function ChartSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-8 w-1/3 mb-6" />
      <Skeleton className="h-[400px] w-full" />
    </Card>
  )
}

export function TableSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-8 w-1/3 mb-4" />
      <div className="space-y-2">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </Card>
  )
}

export function CardSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="h-6 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </Card>
  )
}
