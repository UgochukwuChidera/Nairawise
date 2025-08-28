
"use client"

import * as React from 'react'
import { ComposedChart, Bar, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { monthlyFinancialData } from '@/lib/analytics-data'
import type { LegendsWithRender } from '@/lib/types'

const initialHidden = {
    previousIncome: true,
    previousExpenses: true,
}

export function IncomeExpenseChart() {
  const [hiddenSeries, setHiddenSeries] = React.useState(initialHidden)

  const handleLegendClick = (dataKey: string) => {
    if (dataKey === 'previousIncome' || dataKey === 'previousExpenses') {
      setHiddenSeries(prev => ({ ...prev, [dataKey as keyof typeof prev]: !prev[dataKey as keyof typeof prev] }))
    }
  }

  const renderLegend = (props: LegendsWithRender) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-5">
        {
          payload.map((entry, index) => {
            const isClickable = entry.dataKey === 'previousIncome' || entry.dataKey === 'previousExpenses'
            return (
              <li
                key={`item-${index}`}
                onClick={() => handleLegendClick(entry.dataKey as string)}
                className={`flex items-center gap-2 text-xs ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
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
    <ChartContainer config={{}} className="w-full" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={monthlyFinancialData}>
          <CartesianGrid vertical={false} />
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
            tickFormatter={(value) => `₦${Number(value) / 1000}k`}
          />
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => {
                    if ((hiddenSeries as any)[item.dataKey]) {
                        return null;
                    }
                    const formattedName = name
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase());
                    return [`₦${(value as number).toLocaleString()}`, formattedName];
                }}
              />
            }
          />
          <Legend content={renderLegend} />
          <Bar
            dataKey="income"
            fill="hsl(var(--chart-income))"
            radius={[4, 4, 0, 0]}
            name="Income"
          />
          <Bar
            dataKey="expenses"
            fill="hsl(var(--chart-expense))"
            radius={[4, 4, 0, 0]}
            name="Expenses"
          />
          <Line 
            type="monotone" 
            dataKey="previousIncome" 
            stroke="hsl(var(--chart-income) / 0.5)" 
            strokeWidth={2} 
            name="Past Income" 
            strokeDasharray="5 5" 
            dot={false} 
            activeDot={{ r: 6 }} 
            hide={hiddenSeries.previousIncome} 
          />
          <Line 
            type="monotone" 
            dataKey="previousExpenses" 
            stroke="hsl(var(--chart-expense) / 0.5)" 
            strokeWidth={2} 
            name="Past Expenses" 
            strokeDasharray="5 5" 
            dot={false} 
            activeDot={{ r: 6 }} 
            hide={hiddenSeries.previousExpenses} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
