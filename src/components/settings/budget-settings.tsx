"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useBudget } from '@/context/budget-context'
import { BudgetCardActions } from '@/components/budget/budget-card-actions'
import { AddBudgetDialog } from '../budget/add-budget-dialog'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'

export function BudgetSettings() {
    const { budgets } = useBudget()

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Budget Categories</CardTitle>
                        <CardDescription>
                        Manage your financial categories and their allocated amounts.
                        </CardDescription>
                    </div>
                    <AddBudgetDialog />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {budgets.map((budget) => (
                        <div key={budget.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                           <div>
                             <p className="font-semibold">{budget.category}</p>
                             <p className="text-sm text-muted-foreground">
                                Allocated: ₦{budget.allocated.toLocaleString()}
                             </p>
                           </div>
                           <BudgetCardActions 
                                budget={budget} 
                                trigger={
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </Button>
                                } 
                            />
                        </div>
                    ))}
                     {budgets.length === 0 && (
                        <div className="text-center p-8 text-muted-foreground">
                            You haven&apos;t set up any budget categories yet.
                        </div>
                    )}
                </div>
            </CardContent>
      </Card>
    )
}
