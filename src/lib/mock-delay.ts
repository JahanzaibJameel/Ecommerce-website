// Simulate real-world API conditions

export const simulateNetwork = {
  delay: (ms: number = 300): Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms)),
  
  randomFailure: (failureRate: number = 0.1): void => {
    if (Math.random() < failureRate) {
      throw new Error('Simulated API error - try again')
    }
  },
  
  // Use in data fetching
  fetchWithDelay: async <T>(
    data: T, 
    options?: { delay?: number; failureRate?: number }
  ): Promise<T> => {
    const delay = options?.delay ?? 300
    const failureRate = options?.failureRate ?? 0.1
    await simulateNetwork.delay(delay)
    simulateNetwork.randomFailure(failureRate)
    return data
  },
  
  // Simulate network conditions
  simulateSlowNetwork: (minDelay = 1000, maxDelay = 3000): Promise<void> => {
    const delay = minDelay + Math.random() * (maxDelay - minDelay)
    return simulateNetwork.delay(delay)
  },
  
  simulateUnstableNetwork: (): Promise<void> => {
    const shouldFail = Math.random() < 0.3
    if (shouldFail) {
      return simulateNetwork.delay(2000).then(() => {
        throw new Error('Network request failed')
      })
    }
    return simulateNetwork.delay(500)
  },
}

// Mock API responses
export const mockResponses = {
  products: {
    success: (data: unknown) => ({
      status: 200,
      data,
      message: 'Success',
    }),
    error: (message = 'Failed to fetch products') => ({
      status: 500,
      data: null,
      message,
    }),
    empty: () => ({
      status: 200,
      data: [],
      message: 'No products found',
    }),
  },
}