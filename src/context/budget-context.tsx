"use client"

import * as React from 'react';
import type { Budget, BudgetContextType } from '@/lib/types';
import { budgets as initialBudgets } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';

export const BudgetContext = React.createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgets, setBudgets] = React.useState<Budget[]>(initialBudgets);
  const { toast } = useToast();

  const addBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget = { 
        ...budget, 
        id: (budgets.length + 1).toString(), 
        spent: 0 
    };
    setBudgets(prev => [...prev, newBudget]);
    toast({
        title: 'Budget Added',
        description: `The "${newBudget.category}" budget has been created.`,
    });
  };

  const updateBudget = (id: string, updatedBudget: Partial<Omit<Budget, 'id' | 'spent'>>) => {
    setBudgets(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updatedBudget } : b))
    );
    toast({
        title: 'Budget Updated',
        description: `The budget has been successfully updated.`,
    });
  };

  const deleteBudget = (id: string) => {
    const budgetToDelete = budgets.find(b => b.id === id);
    setBudgets(prev => prev.filter(b => b.id !== id));
    toast({
        title: 'Budget Deleted',
        description: `The "${budgetToDelete?.category}" budget has been deleted.`,
        variant: 'destructive'
    });
  };
  
  return (
    <BudgetContext.Provider value={{ budgets, addBudget, updateBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = React.useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
