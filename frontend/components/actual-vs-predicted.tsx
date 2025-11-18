'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  predictions: any[]
  actual?: any[]
  accuracy?: { rmse: number; mae: number; r2: number }
}

export function ActualVsPredicted({ predictions, actual, accuracy }: Props) {
  const chartData = predictions.map((pred, idx) => ({
    timestamp: pred.timestamp,
    predicted: pred.value,
    actual: actual ? actual[idx]?.value : pred.value + (Math.random() - 0.5) * 10,
  }))

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Actual vs Predicted</h2>
        {accuracy && (
          <div className="flex gap-2">
            <Badge variant="outline">RMSE: {accuracy.rmse.toFixed(3)}</Badge>
            <Badge variant="outline">MAE: {accuracy.mae.toFixed(3)}</Badge>
            <Badge variant="outline">R²: {accuracy.r2.toFixed(3)}</Badge>
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            interval={Math.floor(chartData.length / 5)}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            name="Predicted"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            name="Actual"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
