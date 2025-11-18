'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const sampleCSVContent = `timestamp,temperature,hour,day,previous_consumption,humidity
2025-01-01 00:00,15.2,0,1,120.5,65
2025-01-01 04:00,12.8,4,1,118.2,70
2025-01-01 08:00,14.5,8,1,142.8,55
2025-01-01 12:00,22.3,12,1,156.3,45
2025-01-01 16:00,24.1,16,1,149.7,40
2025-01-01 20:00,18.9,20,1,138.9,50`

export function SampleCSVGenerator() {
  const downloadSample = () => {
    const blob = new Blob([sampleCSVContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample-gefcom.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'Sample CSV downloaded',
    })
  }

  const copySample = () => {
    navigator.clipboard.writeText(sampleCSVContent)
    toast({
      title: 'Success',
      description: 'Sample CSV copied to clipboard',
    })
  }

  return (
    <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <h3 className="text-lg font-bold mb-2">Need a Sample CSV?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Download or copy a sample CSV to understand the required format
      </p>
      <div className="flex gap-2">
        <Button onClick={downloadSample} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download Sample
        </Button>
        <Button onClick={copySample} variant="outline" className="gap-2">
          <Copy className="h-4 w-4" />
          Copy Sample
        </Button>
      </div>
    </Card>
  )
}
