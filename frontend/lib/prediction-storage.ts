interface StoredPrediction {
  id: string
  timestamp: Date
  input: Record<string, any>
  output: number
  model: string
}

export const predictionStorage = {
  addPrediction: (input: Record<string, any>, output: number, model: string = 'random-forest') => {
    const predictions = predictionStorage.getPredictions()
    const newPrediction: StoredPrediction = {
      id: `pred-${Date.now()}`,
      timestamp: new Date(),
      input,
      output,
      model,
    }
    predictions.push(newPrediction)
    localStorage.setItem('gefcom_predictions', JSON.stringify(predictions))
    return newPrediction
  },

  getPredictions: (): StoredPrediction[] => {
    const stored = localStorage.getItem('gefcom_predictions')
    return stored ? JSON.parse(stored) : []
  },

  clearPredictions: () => {
    localStorage.removeItem('gefcom_predictions')
  },
}
