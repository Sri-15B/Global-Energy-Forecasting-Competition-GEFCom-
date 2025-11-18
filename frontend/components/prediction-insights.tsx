'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface Props {
  predictions: any[]
}

export function PredictionInsights({ predictions }: Props) {
  const values = predictions.map(p => p.value)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length

  const maxIdx = predictions.findIndex(p => p.value === maxValue)
  const minIdx = predictions.findIndex(p => p.value === minValue)

  const peakHour = predictions[maxIdx]?.timestamp?.split(' ')[1] || 'N/A'
  const lowestHour = predictions[minIdx]?.timestamp?.split(' ')[1] || 'N/A'

  const highConsumptionDays = predictions.filter(p => p.value > avgValue * 1.1).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Peak Usage Hour</p>
            <p className="text-2xl font-bold">{peakHour}</p>
          </div>
          <TrendingUp className="h-6 w-6 text-red-500" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Lowest Usage Hour</p>
            <p className="text-2xl font-bold">{lowestHour}</p>
          </div>
          <TrendingDown className="h-6 w-6 text-green-500" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Average Load</p>
            <p className="text-2xl font-bold">{avgValue.toFixed(1)} MW</p>
          </div>
          <Zap className="h-6 w-6 text-blue-500" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">High Consumption Days</p>
            <p className="text-2xl font-bold">{highConsumptionDays}</p>
          </div>
          <Zap className="h-6 w-6 text-orange-500" />
        </div>
      </Card>
    </div>
  )
}
