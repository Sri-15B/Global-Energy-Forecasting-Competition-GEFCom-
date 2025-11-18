'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

export interface SinglePredictionResult {
  prediction: number
  confidence: number
}

interface Props {
  onPredictionMade?: (result: SinglePredictionResult) => void
}

export function SinglePrediction({ onPredictionMade }: Props) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SinglePredictionResult | null>(null)
  const [formData, setFormData] = useState({
    temperature: '',
    hour: '12',
    day: '1',
    previousConsumption: '',
    humidity: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePredict = async () => {
    if (!formData.temperature || !formData.previousConsumption || !formData.humidity) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(
        'https://global-energy-forecasting-competition.onrender.com/predict-single',
        {
          temperature: parseFloat(formData.temperature),
          hour: parseInt(formData.hour),
          day: parseInt(formData.day),
          previous_consumption: parseFloat(formData.previousConsumption),
          humidity: parseFloat(formData.humidity),
        }
      )

      if (response.data?.prediction !== undefined) {
        const prediction: SinglePredictionResult = {
          prediction: response.data.prediction,
          confidence: response.data.confidence || 0.92,
        }
        setResult(prediction)
        onPredictionMade?.(prediction)
        toast({
          title: 'Success',
          description: 'Prediction generated successfully',
        })
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to generate prediction',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Real-Time Prediction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Temperature (°C) *</label>
          <Input
            type="number"
            name="temperature"
            placeholder="e.g., 22.5"
            value={formData.temperature}
            onChange={handleInputChange}
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hour of Day (0-23) *</label>
          <Input
            type="number"
            name="hour"
            placeholder="12"
            value={formData.hour}
            onChange={handleInputChange}
            min="0"
            max="23"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Day of Week (1-7) *</label>
          <Input
            type="number"
            name="day"
            placeholder="1"
            value={formData.day}
            onChange={handleInputChange}
            min="1"
            max="7"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Previous Consumption (MW) *</label>
          <Input
            type="number"
            name="previousConsumption"
            placeholder="e.g., 125.5"
            value={formData.previousConsumption}
            onChange={handleInputChange}
            step="0.1"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Humidity (%) *</label>
          <Input
            type="number"
            name="humidity"
            placeholder="e.g., 65"
            value={formData.humidity}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>

      <Button
        onClick={handlePredict}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? 'Calculating...' : 'Get Prediction'}
      </Button>

      {result && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-muted-foreground mb-2">Predicted Energy Consumption</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {result.prediction.toFixed(2)} MW
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </Card>
  )
}
