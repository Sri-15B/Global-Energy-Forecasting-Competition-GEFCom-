export const generateReportData = (
  predictions: any[],
  accuracy: { rmse: number; mae: number; r2: number },
  insights: any
) => {
  return {
    title: 'GEFCom Energy Prediction Report',
    generatedAt: new Date().toLocaleString(),
    totalPredictions: predictions.length,
    accuracy,
    insights,
    predictions: predictions.slice(0, 20), // First 20 for report
  }
}

export const downloadReportAsCSV = (reportData: any) => {
  const csv = [
    ['GEFCom Energy Forecasting Report'],
    [`Generated: ${reportData.generatedAt}`],
    [],
    ['Accuracy Metrics'],
    [`RMSE: ${reportData.accuracy.rmse.toFixed(4)}`],
    [`MAE: ${reportData.accuracy.mae.toFixed(4)}`],
    [`R² Score: ${reportData.accuracy.r2.toFixed(4)}`],
    [],
    ['Insights'],
    [`Peak Usage Hour: ${reportData.insights.peakHour}`],
    [`Average Load: ${reportData.insights.avgLoad.toFixed(2)} MW`],
    [`Lowest Usage Hour: ${reportData.insights.lowestHour}`],
    [],
    ['Sample Predictions'],
    ['Timestamp', 'Value'],
    ...reportData.predictions.map((p: any) => [p.timestamp, p.value]),
  ]
    .map((row) => row.join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `gefcom-report-${Date.now()}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}
