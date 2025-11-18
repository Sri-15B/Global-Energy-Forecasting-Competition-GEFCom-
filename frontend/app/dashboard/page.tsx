'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ExternalLink, TrendingUp } from 'lucide-react'
import { SinglePrediction } from '@/components/single-prediction'
import { FeatureImportance } from '@/components/feature-importance'
import { PredictionHistory } from '@/components/prediction-history'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { ApiStatusIndicator } from '@/components/api-status-indicator'

const sampleData = [
  { timestamp: '2025-01-01 00:00', value: 125.4 },
  { timestamp: '2025-01-01 04:00', value: 118.2 },
  { timestamp: '2025-01-01 08:00', value: 142.8 },
  { timestamp: '2025-01-01 12:00', value: 156.3 },
  { timestamp: '2025-01-01 16:00', value: 149.7 },
  { timestamp: '2025-01-01 20:00', value: 138.9 },
  { timestamp: '2025-01-02 00:00', value: 122.5 },
]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('gefcom_user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) return null

  return (
    <Layout>
      <div className="space-y-8">
        <BreadcrumbNav />
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.email}</h1>
            <p className="text-muted-foreground text-lg">
              Global Energy Forecasting Competition – GEFCom
            </p>
          </div>
          <ApiStatusIndicator />
        </div>

        <SinglePrediction />

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to make predictions?</h2>
              <p className="mb-6 opacity-90">
                Upload your data and get AI-powered energy consumption forecasts instantly.
              </p>
              <Button
                onClick={() => router.push('/bulk-predict')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Bulk Prediction
              </Button>
            </div>
            <TrendingUp className="h-12 w-12 opacity-50" />
          </div>
        </Card>

        <FeatureImportance />

        {/* Project Info */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Global Energy Forecasting Competition – GEFCom</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Energy consumption prediction using advanced machine learning models
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => window.open('https://github.com/Sri-15B/Global-Energy-Forecasting-Competition-GEFCom-', '_blank')}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </Button>
        </Card>

        {/* Sample Predictions Chart */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Sample Predictions</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tick={{ fontSize: 12 }}
                interval={Math.floor(sampleData.length / 5)}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <PredictionHistory />
      </div>
    </Layout>
  )
}
