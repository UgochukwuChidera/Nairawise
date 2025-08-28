
"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { monthlyFinancialData } from '@/lib/analytics-data'
import type { SavingsData } from '@/lib/types'

export function SavingsOverspendChart() {
  const savingsData = monthlyFinancialData.map(item => {
    const diff = item.income - item.expenses
    return {
      month: item.month,
      savings: diff > 0 ? diff : 0,
      overspend: diff < 0 ? Math.abs(diff) : 0,
    }
  }) as SavingsData[]

  return (
    <ChartContainer config={{}} className="w-full" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={savingsData}>
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
                    formatter={(value, name) => [`₦${(value as number).toLocaleString()}`, name]}
                    payload={savingsData.filter(p => p.savings > 0 || p.overspend > 0)}
              />
            }
          />
          <Legend />
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-savings))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-savings))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOverspend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-overspend))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-overspend))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="savings"
            stroke="hsl(var(--chart-savings))"
            fill="url(#colorSavings)"
            name="Savings"
          />
          <Area
            type="monotone"
            dataKey="overspend"
            stroke="hsl(var(--chart-overspend))"
            fill="url(#colorOverspend)"
            name="Overspend"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
