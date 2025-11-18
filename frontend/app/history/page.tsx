'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { predictionStorage } from '@/lib/prediction-storage'
import { Download, Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface StoredPrediction {
  id: string
  timestamp: Date
  input: Record<string, any>
  output: number
  model: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [predictions, setPredictions] = useState<StoredPrediction[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('gefcom_user')
    if (!userData) {
      router.push('/login')
      return
    }
    setPredictions(predictionStorage.getPredictions())
  }, [router])

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all prediction history?')) {
      predictionStorage.clearPredictions()
      setPredictions([])
      toast({
        title: 'Success',
        description: 'Prediction history cleared',
      })
    }
  }

  const exportAsCSV = () => {
    if (predictions.length === 0) {
      toast({
        title: 'Error',
        description: 'No predictions to export',
        variant: 'destructive',
      })
      return
    }

    const csv = [
      ['ID', 'Timestamp', 'Model', 'Output (MW)', 'Temperature', 'Hour', 'Day'],
      ...predictions.map(p => [
        p.id,
        new Date(p.timestamp).toISOString(),
        p.model,
        p.output.toFixed(2),
        p.input.temperature?.toFixed(1) || 'N/A',
        p.input.hour || 'N/A',
        p.input.day || 'N/A',
      ]),
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gefcom-history-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'History exported as CSV',
    })
  }

  return (
    <Layout>
      <BreadcrumbNav />
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Prediction History</h1>
            <p className="text-muted-foreground">
              All your energy consumption predictions in one place
            </p>
          </div>
          <Badge variant="outline">{predictions.length} predictions</Badge>
        </div>

        {predictions.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={exportAsCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export as CSV
            </Button>
            <Button onClick={clearHistory} variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        )}

        <Card className="p-6">
          {predictions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No predictions yet</p>
              <Button onClick={() => router.push('/single-predict')}>
                Make a Prediction
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Timestamp</th>
                    <th className="text-left py-3 px-4 font-semibold">Model</th>
                    <th className="text-left py-3 px-4 font-semibold">Prediction (MW)</th>
                    <th className="text-left py-3 px-4 font-semibold">Temperature</th>
                    <th className="text-left py-3 px-4 font-semibold">Hour</th>
                    <th className="text-left py-3 px-4 font-semibold">Day</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((pred) => (
                    <tr key={pred.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">
                        {new Date(pred.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Badge variant="outline">{pred.model}</Badge>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {pred.output.toFixed(2)} MW
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {pred.input.temperature?.toFixed(1) || 'N/A'}°C
                      </td>
                      <td className="py-3 px-4 text-sm">{pred.input.hour || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm">{pred.input.day || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  )
}
