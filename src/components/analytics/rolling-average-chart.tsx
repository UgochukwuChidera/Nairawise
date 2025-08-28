
"use client"

import * as React from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { dailySpendData, calculateRollingAverage } from '@/lib/analytics-data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function RollingAverageChart() {
  const [windowSize, setWindowSize] = React.useState(10)

  const chartData = React.useMemo(() => {
    const averages = calculateRollingAverage(dailySpendData, windowSize)
    return dailySpendData.map((item, index) => ({
      ...item,
      average: averages[index],
    }))
  }, [windowSize])

  return (
    <>
      <div className="flex justify-end mb-4">
        <Select value={String(windowSize)} onValueChange={(val) => setWindowSize(Number(val))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select window" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5-Day Window</SelectItem>
            <SelectItem value="10">10-Day Window</SelectItem>
            <SelectItem value="20">20-Day Window</SelectItem>
            <SelectItem value="50">50-Day Window</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={{}} className="w-full" style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `Day ${value}`}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₦${value}`}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [`₦${(value as number).toLocaleString()}`, name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())]}
                />
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="spend"
              stroke="hsl(var(--chart-expense))"
              strokeWidth={2}
              dot={false}
              name="Daily Spend"
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="hsl(var(--chart-income))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name={`${windowSize}-Day Rolling Avg`}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}
