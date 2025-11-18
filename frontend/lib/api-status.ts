const API_URL = 'https://global-energy-forecasting-competition.onrender.com'

export type ApiStatus = 'online' | 'slow' | 'offline'

export const checkApiStatus = async (): Promise<ApiStatus> => {
  try {
    const startTime = Date.now()
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    })
    const responseTime = Date.now() - startTime

    if (!response.ok) return 'offline'
    if (responseTime > 3000) return 'slow'
    return 'online'
  } catch {
    return 'offline'
  }
}
