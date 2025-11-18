'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Code2 } from 'lucide-react'

export default function ModelInfo() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('gefcom_user')
    if (!userData) {
      router.push('/login')
    }
  }, [router])

  return (
    <Layout>
      <BreadcrumbNav />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Model Information</h1>
          <p className="text-muted-foreground">
            Technical details about our energy forecasting model
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <h2 className="text-2xl font-bold mb-4">Random Forest Regressor</h2>
          <p className="text-muted-foreground mb-4">
            Our primary model for energy consumption prediction, trained on historical energy data
            from the Global Energy Forecasting Competition.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge>Machine Learning</Badge>
            <Badge>Ensemble Method</Badge>
            <Badge>Time Series</Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">RMSE</span>
                <span className="font-bold">4.238</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">MAE</span>
                <span className="font-bold">3.124</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">R² Score</span>
                <span className="font-bold">0.876</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold">92.3%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Training Data</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Samples</span>
                <span className="font-bold">500,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Features</span>
                <span className="font-bold">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Training Method</span>
                <span className="font-bold">Cross-validation</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-bold">Nov 2024</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Input Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Temperature', description: '°C - Current ambient temperature' },
              { name: 'Hour of Day', description: '0-23 - Hour in 24-hour format' },
              { name: 'Day of Week', description: '1-7 - Day in week' },
              { name: 'Previous Consumption', description: 'MW - Previous hour consumption' },
              { name: 'Humidity', description: '% - Relative humidity' },
              { name: 'Wind Speed', description: 'km/h - Wind speed' },
            ].map((feature) => (
              <div key={feature.name} className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{feature.name}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Model Architecture</h3>
          <div className="space-y-2 text-sm font-mono text-muted-foreground">
            <p>• Algorithm: Random Forest</p>
            <p>• Trees: 200</p>
            <p>• Max Depth: 15</p>
            <p>• Min Samples Split: 5</p>
            <p>• Framework: scikit-learn 1.3.0</p>
          </div>
        </Card>

        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold mb-4">Learn More</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() =>
                window.open('https://github.com/Sri-15B/Global-Energy-Forecasting-Competition-GEFCom-', '_blank')
              }
            >
              <ExternalLink className="h-4 w-4" />
              View GitHub Repository
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() =>
                window.open('https://www.kaggle.com/competitions/global-energy-forecasting-competition-2025', '_blank')
              }
            >
              <Code2 className="h-4 w-4" />
              GEFCom Competition Page
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
