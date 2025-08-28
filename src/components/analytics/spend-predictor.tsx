
"use client"

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { dailySpendData } from '@/lib/analytics-data'
import { Button } from '../ui/button'
import { RefreshCw } from 'lucide-react'
import { useSettings } from '@/context/settings-context'
import { cn } from '@/lib/utils'

function predictNext(series: number[], window = 3): number {
  if (series.length < window) {
    return series.length > 0 ? series[series.length - 1] : 0
  }

  const n = series.length

  // Step 1: Compute rolling average (RA_t)
  const recent = series.slice(n - window)
  const RA_t = recent.reduce((a, b) => a + b, 0) / window

  // Step 2: Previous rolling average (RA_{t-1})
  const prevRecent = series.slice(n - window - 1, n - 1)
  const RA_prev = prevRecent.reduce((a, b) => a + b, 0) / window
  const deltaRA = RA_t - RA_prev

  // Step 3: Momentum
  const momentum = series[n - 1] - RA_t

  // Step 4: Volatility (standard deviation)
  const variance = recent.reduce((acc, val) => acc + Math.pow(val - RA_t, 2), 0) / window
  const sigma = Math.sqrt(variance)

  // Step 5: Adaptive weights
  const alpha = 1 / (1 + sigma)
  const beta = 1 / (1 + (sigma / (RA_t / 10 || 1)))

  // Step 6: Final prediction
  const prediction = RA_t + beta * deltaRA + alpha * momentum

  return Math.max(0, prediction) // Ensure prediction is not negative
}


export function SpendPredictor() {
  const { showMonetaryValues } = useSettings()
  const [prediction, setPrediction] = React.useState<number | null>(null)
  
  React.useEffect(() => {
    const spendSeries = dailySpendData.map(d => d.spend)
    const nextDayPrediction = predictNext(spendSeries, 7) // Using a 7-day window
    setPrediction(nextDayPrediction)
  }, [])

  const handleRecalculate = () => {
    const spendSeries = dailySpendData.map(d => d.spend)
    const newPrediction = predictNext(spendSeries, 7)
    // Add some randomness to simulate a new calculation
    setPrediction(newPrediction * (Math.random() * 0.1 + 0.95))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Day's Spend Prediction</CardTitle>
        <CardDescription>A statistical estimate of your spending tomorrow.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="text-4xl font-bold">
            {prediction !== null ? (
                 <span className={cn(!showMonetaryValues && "blur-sm")}>
                    {showMonetaryValues ? `~₦${Math.round(prediction).toLocaleString()}` : '₦•••••'}
                </span>
            ) : (
                <span>Calculating...</span>
            )}
        </div>
        <p className="text-sm text-muted-foreground">
            Based on your recent spending habits and trends.
        </p>
        <Button onClick={handleRecalculate}>
            <RefreshCw className="mr-2" />
            Recalculate
        </Button>
      </CardContent>
    </Card>
  )
}
