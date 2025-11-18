'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { predictionStorage } from '@/lib/prediction-storage'
import { useState, useEffect } from 'react'

interface StoredPrediction {
  id: string
  timestamp: Date
  input: Record<string, any>
  output: number
  model: string
}

export function PredictionHistory() {
  const [predictions, setPredictions] = useState<StoredPrediction[]>([])

  useEffect(() => {
    setPredictions(predictionStorage.getPredictions())
  }, [])

  const clearHistory = () => {
    predictionStorage.clearPredictions()
    setPredictions([])
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Prediction History</h2>
        {predictions.length > 0 && (
          <Button
            onClick={clearHistory}
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {predictions.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No predictions yet</p>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {predictions.map((pred) => (
            <div
              key={pred.id}
              className="p-3 bg-muted rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {new Date(pred.timestamp).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Model: {pred.model} | Result: {pred.output.toFixed(2)} MW
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
