
import type { MonthlyFinancials, DailySpend, BudgetBreakdown } from "./types";

export const monthlyFinancialData: MonthlyFinancials[] = [
  { month: 'Jul', income: 18600, expenses: 14000 },
  { month: 'Aug', income: 30500, expenses: 13980 },
  { month: 'Sep', income: 23700, expenses: 19800 },
  { month: 'Oct', income: 65000, expenses: 17500 },
  { month: 'Nov', income: 48900, expenses: 29800 },
  { month: 'Dec', income: 43900, expenses: 28000 },
  { month: 'Jan', income: 32000, expenses: 37000 },
];

export const budgetBreakdownData: BudgetBreakdown[] = [
  { category: 'Food', spent: 12500 },
  { category: 'Transport', spent: 8500 },
  { category: 'Data', spent: 3000 },
  { category: 'Entertainment', spent: 7500 },
  { category: 'Supplies', spent: 5000 },
];

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

// Generate more realistic daily spend data
const generateDailySpend = (days: number): DailySpend[] => {
  const data: DailySpend[] = [];
  let baseSpend = 500;
  for (let i = 1; i <= days; i++) {
    // Add some noise, weekly patterns, and occasional spikes
    const dayOfWeek = i % 7;
    let spend = baseSpend + Math.random() * 200 - 100; // Base with noise
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Fri, Sat
      spend *= 1.5; // Weekend spike
    }
    if (i % 30 === 15) { // Mid-month bigger purchase
      spend *= 2;
    }
    data.push({ day: i, spend: Math.max(0, Math.round(spend)) });
  }
  return data;
};

export const dailySpendData: DailySpend[] = generateDailySpend(90); // 90 days of data

export const calculateRollingAverage = (data: DailySpend[], windowSize: number): (number | null)[] => {
  const averages: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      averages.push(null);
    } else {
      const window = data.slice(i - windowSize + 1, i + 1);
      const sum = window.reduce((acc, curr) => acc + curr.spend, 0);
      averages.push(Math.round(sum / windowSize));
    }
  }
  return averages;
};

