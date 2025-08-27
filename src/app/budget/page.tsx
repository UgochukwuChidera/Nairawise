import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { budgets } from '@/lib/placeholder-data'
import { cn } from '@/lib/utils'

function getProgressColor(percentage: number) {
  if (percentage > 90) return 'bg-destructive'
  if (percentage > 75) return 'bg-primary/70'
  return 'bg-primary'
}

export default function BudgetPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Budget Planner</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.allocated) * 100)
          const isOverBudget = budget.spent > budget.allocated
          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle>{budget.category}</CardTitle>
                <CardDescription>
                  {isOverBudget ? (
                     <span className="text-destructive font-medium">
                        ₦{(budget.spent - budget.allocated).toLocaleString()} over budget
                     </span>
                  ) : (
                    <span>
                      ₦{(budget.allocated - budget.spent).toLocaleString()} left
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress
                  value={Math.min(percentage, 100)}
                  className="h-3"
                  indicatorClassName={cn(getProgressColor(percentage))}
                />
                <div className="text-sm text-muted-foreground mt-2">
                  Spent ₦{budget.spent.toLocaleString()} of ₦{budget.allocated.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
