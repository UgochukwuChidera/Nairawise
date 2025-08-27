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
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BudgetCardActions } from '@/components/budget/budget-card-actions'

function getProgressColor(percentage: number) {
  if (percentage > 90) return 'bg-destructive'
  if (percentage > 75) return 'bg-primary/70'
  return 'bg-primary'
}

export default function BudgetPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
          <p className="text-muted-foreground mt-2">
            Keep track of your spending and stay on top of your financial goals.
          </p>
        </div>
        <Button size="icon" className="rounded-full shadow-lg">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add new budget</span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.allocated) * 100)
          const isOverBudget = budget.spent > budget.allocated
          return (
            <Card key={budget.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
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
                </div>
                <BudgetCardActions budget={budget} />
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
