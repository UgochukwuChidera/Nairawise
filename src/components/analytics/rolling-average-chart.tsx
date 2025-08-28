
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export type RollingAverageChartProps = {
  data: { day: number; spend: number; average: number | null }[];
};

export function RollingAverageChart({ data }: RollingAverageChartProps) {
  return (
    <ChartContainer config={{}} className="w-full" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
            data={data}
            margin={{
                top: 5,
                right: 20,
                left: -10,
                bottom: 5,
            }}
        >
          <CartesianGrid vertical={false} />
          <XAxis 
            dataKey="day"
            tickFormatter={(value) => `Day ${value}`}
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
            tickFormatter={(value) => `₦${value}`}
          />
          <Tooltip 
            content={
                <ChartTooltipContent 
                    formatter={(value, name) => [
                        `₦${(value as number).toLocaleString()}`, 
                        name === 'spend' ? 'Daily Spend' : 'Rolling Average'
                    ]}
                />
            }
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="spend" 
            stroke="hsl(var(--chart-expense) / 0.5)" 
            strokeWidth={2}
            dot={false}
            name="Daily Spend"
           />
           <Line 
            type="monotone" 
            dataKey="average" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={false}
            name="Rolling Average"
           />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
