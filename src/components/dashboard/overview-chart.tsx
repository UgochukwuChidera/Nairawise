'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
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
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                    return [`₦${value.toLocaleString()}`, formattedName]
                }}
            />}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}}/>
            <Line type="monotone" dataKey="income" stroke="hsl(var(--primary))" strokeWidth={2} name="Income" dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={2} name="Expenses" dot={{ r: 4, fill: 'hsl(var(--destructive))' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
