'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Navbar } from './navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-card p-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground text-center">
          Developed by Sri (
          <a
            href="https://github.com/Sri-15B"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sri-15B
          </a>
          ) • Project: Global Energy Forecasting Competition – GEFCom •{' '}
          <a
            href="https://github.com/Sri-15B/Global-Energy-Forecasting-Competition-GEFCom-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
