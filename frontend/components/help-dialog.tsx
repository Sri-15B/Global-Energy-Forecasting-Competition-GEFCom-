'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HelpCircle, X } from 'lucide-react'

export function HelpDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <HelpCircle className="h-4 w-4" />
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold">CSV Format Guide</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Required Columns</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• <strong>timestamp</strong>: Date and time in format YYYY-MM-DD HH:mm</li>
                    <li>• <strong>value</strong>: Numerical energy consumption value</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example CSV</h3>
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`timestamp,value
2025-01-01 00:00,125.4
2025-01-01 04:00,118.2
2025-01-01 08:00,142.8`}
                  </pre>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Make sure your CSV file contains these exact column headers and follows the format shown above.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
