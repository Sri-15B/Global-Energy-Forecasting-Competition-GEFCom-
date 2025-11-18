'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { SinglePrediction } from '@/components/single-prediction'
import { Card } from '@/components/ui/card'
import { PredictionHistory } from '@/components/prediction-history'
import { FeatureImportance } from '@/components/feature-importance'

export default function SinglePredictPage() {
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
          <h1 className="text-4xl font-bold mb-2">Single Prediction</h1>
          <p className="text-muted-foreground">
            Get instant energy consumption predictions with real-time input
          </p>
        </div>

        <SinglePrediction />
        
        <FeatureImportance />

        <PredictionHistory />
      </div>
    </Layout>
  )
}
