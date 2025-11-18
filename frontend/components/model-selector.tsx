'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'

interface Props {
  value: string
  onChange: (value: string) => void
}

const models = [
  {
    id: 'random-forest',
    name: 'Random Forest',
    description: 'Ensemble method - Most accurate',
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    description: 'Gradient boosting - Fast & accurate',
  },
  {
    id: 'linear',
    name: 'Linear Regression',
    description: 'Simple baseline model',
  },
]

export function ModelSelector({ value, onChange }: Props) {
  const selectedModel = models.find(m => m.id === value)

  return (
    <Card className="p-4">
      <label className="block text-sm font-medium mb-2">Select Prediction Model</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {models.map(model => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedModel && (
        <p className="text-xs text-muted-foreground mt-2">{selectedModel.description}</p>
      )}
    </Card>
  )
}
