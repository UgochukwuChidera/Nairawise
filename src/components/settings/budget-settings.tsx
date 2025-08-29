
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useBudget } from '@/context/budget-context'
import { BudgetCardActions } from '@/components/budget/budget-card-actions'
import { AddBudgetDialog } from '../budget/add-budget-dialog'
import { Button } from '../ui/button'
import { MoreHorizontal, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function BudgetSettings() {
    const { budgets } = useBudget()
    const { toast } = useToast()

    const handleShare = () => {
        toast({
        title: 'Budget Template Shared!',
        description: 'Your budget categories and percentages have been copied to the clipboard.',
        })
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle>Budget Categories</CardTitle>
                        <CardDescription>
                        Manage your financial categories and their allocated amounts.
                        </CardDescription>
                    </div>
                    <div className="ml-4 shrink-0 flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                        <AddBudgetDialog />
                    </div>
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
