'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const pathNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/bulk-predict': 'Bulk Prediction',
  '/single-predict': 'Single Prediction',
  '/model-info': 'Model Info',
  '/history': 'History',
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length <= 1) return null

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/dashboard" className="hover:text-foreground transition-colors">
        Home
      </Link>
      {pathSegments.map((segment, idx) => (
        <div key={segment} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {idx === pathSegments.length - 1 ? (
            <span className="text-foreground font-medium">
              {pathNames[`/${pathSegments.slice(0, idx + 1).join('/')}`] || segment}
            </span>
          ) : (
            <Link
              href={`/${pathSegments.slice(0, idx + 1).join('/')}`}
              className="hover:text-foreground transition-colors"
            >
              {pathNames[`/${segment}`] || segment}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
