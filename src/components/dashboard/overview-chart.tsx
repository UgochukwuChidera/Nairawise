'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Line } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'

const data = [
  { month: 'Jul', income: 18600, expenses: 8000, previousIncome: 15000, previousExpenses: 7000 },
  { month: 'Aug', income: 30500, expenses: 13980, previousIncome: 28000, previousExpenses: 12000 },
  { month: 'Sep', income: 23700, expenses: 9800, previousIncome: 22000, previousExpenses: 10500 },
  { month: 'Oct', income: 65000, expenses: 17500, previousIncome: 61000, previousExpenses: 16000 },
  { month: 'Nov', income: 48900, expenses: 19800, previousIncome: 52000, previousExpenses: 21000 },
  { month: 'Dec', income: 43900, expenses: 18000, previousIncome: 45000, previousExpenses: 19000 },
]

export function OverviewChart() {
  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            />
            <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₦${value / 1000}k`}
            />
            <Tooltip
            content={<ChartTooltipContent
                formatter={(value, name) => {
                    const formattedName = name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                    return [`₦${value.toLocaleString()}`, formattedName]
                }}
            />}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}}/>
            <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Income" />
            <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Expenses" />
            <Line type="monotone" dataKey="previousIncome" stroke="hsl(var(--primary) / 0.5)" strokeWidth={2} name="Past Income" strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="previousExpenses" stroke="hsl(var(--destructive) / 0.5)" strokeWidth={2} name="Past Expenses" strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
