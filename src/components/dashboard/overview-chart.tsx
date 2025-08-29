
'use client'

import { useMemo, useState } from 'react'
import { Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Line } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { LegendsWithRender, SavingsData } from '@/lib/types'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'


const data = [
  { month: 'Jul', income: 18600, expenses: 8000, previousIncome: 15000, previousExpenses: 7000 },
  { month: 'Aug', income: 30500, expenses: 13980, previousIncome: 28000, previousExpenses: 12000 },
  { month: 'Sep', income: 23700, expenses: 9800, previousIncome: 22000, previousExpenses: 10500 },
  { month: 'Oct', income: 65000, expenses: 17500, previousIncome: 61000, previousExpenses: 16000 },
  { month: 'Nov', income: 48900, expenses: 19800, previousIncome: 52000, previousExpenses: 21000 },
  { month: 'Dec', income: 43900, expenses: 28000, previousIncome: 45000, previousExpenses: 19000 },
  { month: 'Jan', income: 32000, expenses: 37000, previousIncome: 35000, previousExpenses: 33000 },
]

const initialHidden = {
    previousIncome: true,
    previousExpenses: true,
}

type ChartView = 'income-expense' | 'savings-overspend'

export function OverviewChart() {
  const [hiddenSeries, setHiddenSeries] = useState(initialHidden)
  const [view, setView] = useState<ChartView>('income-expense')

  const handleLegendClick = (dataKey: string) => {
    if (dataKey === 'previousIncome' || dataKey === 'previousExpenses') {
      setHiddenSeries(prev => ({ ...prev, [dataKey as keyof typeof prev]: !prev[dataKey as keyof typeof prev] }))
    }
  }

  const savingsData = useMemo<SavingsData[]>(() => {
    return data.map(item => {
        const diff = item.income - item.expenses;
        return {
            month: item.month,
            savings: diff > 0 ? diff : 0,
            overspend: diff < 0 ? -diff : 0
        }
    })
  }, [])
  
  const renderLegend = (props: LegendsWithRender) => {
    const { payload } = props;
    let activeLegends = payload;

    if (view === 'income-expense') {
        activeLegends = payload.filter(entry => 
            ['income', 'expenses', 'previousIncome', 'previousExpenses'].includes(entry.dataKey)
        );
    } else if (view === 'savings-overspend') {
        const hasSavings = savingsData.some(item => item.savings > 0);
        const hasOverspend = savingsData.some(item => item.overspend > 0);
        
        activeLegends = payload.filter(entry => {
            if (entry.dataKey === 'savings') return hasSavings;
            if (entry.dataKey === 'overspend') return hasOverspend;
            return false;
        });
    }
    
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-5">
        {
          activeLegends.map((entry, index) => {
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
    <>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle>Overview</CardTitle>
                <CardDescription>A summary of your financial activity.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Select value={view} onValueChange={(value) => setView(value as ChartView)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="income-expense">Income vs. Expense</SelectItem>
                        <SelectItem value="savings-overspend">Savings & Overspend</SelectItem>
                    </SelectContent>
                </Select>
                 <Button variant="outline" size="sm" asChild>
                    <Link href="/analytics">
                        Go to Analytics
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="w-full" style={{ aspectRatio: '16 / 9' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={view === 'income-expense' ? data : savingsData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
                content={({ active, payload, label }) => {
                    const finalPayload =
                    view === 'savings-overspend'
                        ? payload?.filter((p) => p.value !== 0)
                        : payload;
                    return (
                    <ChartTooltipContent
                        active={active}
                        payload={finalPayload}
                        label={label}
                        formatter={(value, name) => {
                        const formattedName = name
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase());
                        return [`₦${(value as number).toLocaleString()}`, formattedName];
                        }}
                    />
                    );
                }}
                />
                <Legend content={renderLegend} />

                {/* Income vs. Expense Bars */}
                <Bar dataKey="income" fill="hsl(var(--chart-income))" radius={[4, 4, 0, 0]} name="Income" hide={view !== 'income-expense'} />
                <Bar dataKey="expenses" fill="hsl(var(--chart-expense))" radius={[4, 4, 0, 0]} name="Expenses" hide={view !== 'income-expense'} />
                <Line type="monotone" dataKey="previousIncome" stroke="hsl(var(--chart-income) / 0.5)" strokeWidth={2} name="Past Income" strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} hide={view !== 'income-expense' || hiddenSeries.previousIncome} />
                <Line type="monotone" dataKey="previousExpenses" stroke="hsl(var(--chart-expense) / 0.5)" strokeWidth={2} name="Past Expenses" strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} hide={view !== 'income-expense' || hiddenSeries.previousExpenses} />

                {/* Savings & Overspend Bars */}
                <Bar dataKey="savings" fill="hsl(var(--chart-savings))" radius={[4, 4, 0, 0]} name="Savings" hide={view !== 'savings-overspend'} />
                <Bar dataKey="overspend" fill="hsl(var(--chart-overspend))" radius={[4, 4, 0, 0]} name="Overspend" hide={view !== 'savings-overspend'} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </>
  )
}
