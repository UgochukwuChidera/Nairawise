'use client'

import { useState } from 'react'
import { Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Line } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import type { LegendsWithRender } from '@/lib/types'

const data = [
  { month: 'Jul', income: 18600, expenses: 8000, previousIncome: 15000, previousExpenses: 7000 },
  { month: 'Aug', income: 30500, expenses: 13980, previousIncome: 28000, previousExpenses: 12000 },
  { month: 'Sep', income: 23700, expenses: 9800, previousIncome: 22000, previousExpenses: 10500 },
  { month: 'Oct', income: 65000, expenses: 17500, previousIncome: 61000, previousExpenses: 16000 },
  { month: 'Nov', income: 48900, expenses: 19800, previousIncome: 52000, previousExpenses: 21000 },
  { month: 'Dec', income: 43900, expenses: 18000, previousIncome: 45000, previousExpenses: 19000 },
]

const initialHidden = {
    previousIncome: false,
    previousExpenses: false,
}

export function OverviewChart() {
  const [hiddenSeries, setHiddenSeries] = useState(initialHidden)

  const handleLegendClick = (dataKey: string) => {
    if (dataKey === 'previousIncome' || dataKey === 'previousExpenses') {
      setHiddenSeries(prev => ({ ...prev, [dataKey]: !prev[dataKey as keyof typeof prev] }))
    }
  }

  const renderLegend = (props: LegendsWithRender) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-4 pt-5">
        {
          payload.map((entry, index) => {
            const isClickable = entry.dataKey === 'previousIncome' || entry.dataKey === 'previousExpenses'
            return (
              <li
                key={`item-${index}`}
                onClick={() => handleLegendClick(entry.dataKey)}
                className={`flex items-center gap-2 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                style={{
                   opacity: (hiddenSeries as any)[entry.dataKey] ? 0.5 : 1,
                 }}
              >
                <span style={{ backgroundColor: entry.color, width: 10, height: 10, display: 'inline-block', borderRadius: '50%' }}></span>
                {entry.value}
              </li>
            )
          })
        }
      </ul>
    );
  }

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
            <Legend content={renderLegend} />
            <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Income" />
            <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Expenses" />
            <Line type="monotone" dataKey="previousIncome" stroke="hsl(var(--primary) / 0.5)" strokeWidth={2} name="Past Income" strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} hide={hiddenSeries.previousIncome} />
            <Line type="monotone" dataKey="previousExpenses" stroke="hsl(var(--destructive) / 0.5)" strokeWidth={2} name="Past Expenses" strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} hide={hiddenSeries.previousExpenses} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
