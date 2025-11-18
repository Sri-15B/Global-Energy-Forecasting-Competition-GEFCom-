'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, BarChart3, Zap, Info, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  open: boolean
}

export function Sidebar({ open }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('gefcom_user')
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path

  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-0'
      } transition-all duration-300 border-r bg-card flex flex-col h-screen overflow-hidden`}
    >
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">⚡</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">GEFCom</h1>
            <p className="text-xs text-muted-foreground">Energy Forecast</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Main Navigation */}
        <Link href="/dashboard" className="block">
          <Button
            variant={isActive('/dashboard') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>

        <Link href="/bulk-predict" className="block">
          <Button
            variant={isActive('/bulk-predict') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <Zap className="h-4 w-4" />
            Bulk Prediction
          </Button>
        </Link>

        <Link href="/single-predict" className="block">
          <Button
            variant={isActive('/single-predict') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <Zap className="h-4 w-4" />
            Single Prediction
          </Button>
        </Link>

        <Link href="/model-info" className="block">
          <Button
            variant={isActive('/model-info') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <Info className="h-4 w-4" />
            Model Info
          </Button>
        </Link>

        <Link href="/history" className="block">
          <Button
            variant={isActive('/history') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <Clock className="h-4 w-4" />
            History
          </Button>
        </Link>

        <Link href="/reports" className="block">
          <Button
            variant={isActive('/reports') ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <FileText className="h-4 w-4" />
            Reports
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
