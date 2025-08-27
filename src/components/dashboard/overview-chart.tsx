'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'

const data = [
  { month: 'Jul', income: 18600, expenses: 8000 },
  { month: 'Aug', income: 30500, expenses: 13980 },
  { month: 'Sep', income: 23700, expenses: 9800 },
  { month: 'Oct', income: 65000, expenses: 17500 },
  { month: 'Nov', income: 48900, expenses: 19800 },
  { month: 'Dec', income: 43900, expenses: 18000 },
]

export function OverviewChart() {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
            <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            />
            <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₦${value / 1000}k`}
            />
            <Tooltip
            content={<ChartTooltipContent
                formatter={(value, name) => {
                    return [`₦${value.toLocaleString()}`, name]
                }}
            />}
            />
            <Legend />
            <Bar dataKey="income" fill="var(--color-income, hsl(var(--primary)))" radius={4} name="Income" />
            <Bar dataKey="expenses" fill="var(--color-expenses, hsl(var(--secondary)))" radius={4} name="Expenses" />
        </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  )
}
