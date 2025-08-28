export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
};

export type Budget = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
};

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  content: string;
  imageUrl: string;
};

export type Thread = {
  id: string;
  title: string;
  author: string;
  timestamp: string;
  replies: number;
  content: string;
};

export type LegendsWithRender = {
  payload: {
    value: string;
    dataKey: string;
    color: string;
  }[];
}

export type SavingsData = {
    month: string;
    savings: number;
    overspend: number;
}

export type BudgetContextType = {
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  updateBudget: (id: string, updatedBudget: Partial<Omit<Budget, 'id' | 'spent'>>) => void;
  deleteBudget: (id: string) => void;
};
