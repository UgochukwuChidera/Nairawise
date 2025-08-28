
"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { budgetBreakdownData, COLORS } from '@/lib/analytics-data'

export function BudgetBreakdownChart() {
  return (
    <ChartContainer config={{}} className="w-full" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            content={
              <ChartTooltipContent
                nameKey="category"
                formatter={(value, name) => [`₦${(value as number).toLocaleString()}`, name]}
              />
            }
          />
          <Legend />
          <Pie
            data={budgetBreakdownData}
            dataKey="spent"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }) => {
              const RADIAN = Math.PI / 180
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  className="text-xs font-bold"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              )
            }}
          >
            {budgetBreakdownData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
