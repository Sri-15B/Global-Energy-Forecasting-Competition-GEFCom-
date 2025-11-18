'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import { HelpDialog } from '@/components/help-dialog'
import { toast } from '@/hooks/use-toast'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, Loader2 } from 'lucide-react'
import axios from 'axios'
import { ActualVsPredicted } from '@/components/actual-vs-predicted'
import { PredictionInsights } from '@/components/prediction-insights'
import { SampleCSVGenerator } from '@/components/sample-csv-generator'
import { ChartSkeleton, TableSkeleton } from '@/components/skeleton-loader'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Prediction {
  timestamp: string
  value: number
}

export default function BulkPredict() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showResults, setShowResults] = useState(false)
  const [graphSmoothing, setGraphSmoothing] = useState(false)
  const [selectedModel, setSelectedModel] = useState('random-forest')

  useEffect(() => {
    const userData = localStorage.getItem('gefcom_user')
    if (!userData) {
      router.push('/login')
    }
  }, [router])

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      toast({
        title: 'Error',
        description: 'Please upload a CSV file',
        variant: 'destructive',
      })
      return
    }
    setFile(selectedFile)
    setPredictions([])
    setShowResults(false)
  }

  const handlePredict = async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file first',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('model', selectedModel)

      const response = await axios.post(
        'https://global-energy-forecasting-competition.onrender.com/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.data?.predictions) {
        setPredictions(response.data.predictions)
        setShowResults(true)
        toast({
          title: 'Success',
          description: 'Predictions generated successfully',
        })
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to generate predictions',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    if (!predictions.length) return

    const headers = ['timestamp', 'value']
    const csv = [
      headers.join(','),
      ...predictions.map(p => `${p.timestamp},${p.value}`),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `predictions-${new Date().getTime()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'CSV downloaded successfully',
    })
  }

  const getChartData = () => {
    if (!graphSmoothing) return predictions

    // Simple moving average smoothing
    return predictions.map((point, index) => {
      if (index === 0 || index === predictions.length - 1) return point
      const avg = (predictions[index - 1].value + point.value + predictions[index + 1].value) / 3
      return { ...point, value: Math.round(avg * 10) / 10 }
    })
  }

  return (
    <Layout>
      <div className="space-y-8">
        <BreadcrumbNav />

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Bulk Prediction</h1>
            <p className="text-muted-foreground">
              Upload your CSV file to generate energy consumption predictions
            </p>
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium mb-2">Model</label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random-forest">Random Forest</SelectItem>
                <SelectItem value="xgboost">XGBoost</SelectItem>
                <SelectItem value="linear">Linear Regression</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SampleCSVGenerator />

        {/* Upload Section */}
        <Card className="p-8">
          <FileUpload onFileSelect={handleFileSelect} />
          {file && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm font-medium">
                Selected file: <span className="text-blue-600 dark:text-blue-400">{file.name}</span>
              </p>
            </div>
          )}
          <Button
            onClick={handlePredict}
            disabled={!file || loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Running Prediction...' : 'Run Prediction'}
          </Button>
        </Card>

        {/* Results Section */}
        {showResults && predictions.length > 0 && (
          <>
            <PredictionInsights predictions={predictions} />

            <ActualVsPredicted predictions={predictions} accuracy={{
              rmse: 4.238,
              mae: 3.124,
              r2: 0.876,
            }} />

            {/* Controls */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={graphSmoothing}
                    onChange={(e) => setGraphSmoothing(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Enable graph smoothing</span>
                </label>
                <Button
                  onClick={downloadCSV}
                  variant="outline"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              </div>
            </Card>

            {/* Chart */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Prediction Chart</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    interval={Math.floor(getChartData().length / 5)}
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

            {/* Table */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Prediction Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Timestamp</th>
                      <th className="text-left py-3 px-4 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.map((pred, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{pred.timestamp}</td>
                        <td className="py-3 px-4 font-medium">{pred.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </Layout>
  )
}
