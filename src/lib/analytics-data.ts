
import type { MonthlyFinancials, DailySpend, BudgetBreakdown } from "./types";

export const monthlyFinancialData: MonthlyFinancials[] = [
  { month: 'Jul', income: 18600, expenses: 14000, previousIncome: 15000, previousExpenses: 12000 },
  { month: 'Aug', income: 30500, expenses: 13980, previousIncome: 28000, previousExpenses: 15000 },
  { month: 'Sep', income: 23700, expenses: 19800, previousIncome: 25000, previousExpenses: 18000 },
  { month: 'Oct', income: 65000, expenses: 17500, previousIncome: 61000, previousExpenses: 21000 },
  { month: 'Nov', income: 48900, expenses: 29800, previousIncome: 52000, previousExpenses: 25000 },
  { month: 'Dec', income: 43900, expenses: 28000, previousIncome: 45000, previousExpenses: 31000 },
  { month: 'Jan', income: 32000, expenses: 37000, previousIncome: 35000, previousExpenses: 33000 },
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

export const calculateRollingAverage = (data: DailySpend[], windowSize: number): (DailySpend & { average: number | null })[] => {
  return data.map((item, index) => {
    if (index < windowSize - 1) {
      return { ...item, average: null }
    }
    const window = data.slice(index - windowSize + 1, index + 1)
    const sum = window.reduce((acc, curr) => acc + curr.spend, 0)
    const avg = Math.round(sum / windowSize)
    return { ...item, average: avg }
  })
};
