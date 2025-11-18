'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

const featureData = [
  { feature: 'Temperature', importance: 42 },
  { feature: 'Hour of Day', importance: 31 },
  { feature: 'Humidity', importance: 10 },
  { feature: 'Wind Speed', importance: 8 },
  { feature: 'Previous Load', importance: 6 },
  { feature: 'Day of Week', importance: 3 },
]

export function FeatureImportance() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Feature Importance</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Shows which factors influence energy consumption predictions the most
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={featureData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" />
          <YAxis label={{ value: 'Importance (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="importance" fill="hsl(var(--chart-1))" name="Importance" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
