
import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  [category: string]: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const useBudget = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'alimentation', icon: '🍽️', color: '#3B82F6' },
    { id: '2', name: 'logement', icon: '🏠', color: '#10B981' },
    { id: '3', name: 'transport', icon: '🚗', color: '#F59E0B' },
    { id: '4', name: 'loisirs', icon: '🎮', color: '#EF4444' },
  ]);

  const [budget, setBudget] = useState<Budget>({
    alimentation: 150000,
    logement: 300000,
    transport: 75000,
    loisirs: 100000,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 25000,
      category: 'alimentation',
      description: 'Courses de la semaine',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    },
    {
      id: '2',
      amount: 300000,
      category: 'logement',
      description: 'Loyer mensuel',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    },
    {
      id: '3',
      amount: 15000,
      category: 'transport',
      description: 'Essence',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    },
    {
      id: '4',
      amount: 500000,
      category: 'revenus',
      description: 'Salaire',
      date: new Date().toISOString().split('T')[0],
      type: 'income'
    }
  ]);

  const addCategory = (name: string, icon: string, color: string) => {
    const newCategory = {
      id: Date.now().toString(),
      name: name.toLowerCase(),
      icon,
      color
    };
    setCategories(prev => [...prev, newCategory]);
    setBudget(prev => ({
      ...prev,
      [name.toLowerCase()]: 0
    }));
  };

  const deleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      setBudget(prev => {
        const newBudget = { ...prev };
        delete newBudget[category.name];
        return newBudget;
      });
      setTransactions(prev => prev.filter(t => t.category !== category.name));
    }
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === id ? { ...t, ...updatedTransaction } : t
      )
    );
  };

  const updateBudget = (category: string, amount: number) => {
    setBudget(prev => ({
      ...prev,
      [category]: amount
    }));
  };

  const resetBudget = () => {
    const defaultBudget: Budget = {};
    categories.forEach(category => {
      defaultBudget[category.name] = 50000;
    });
    setBudget(defaultBudget);
  };

  const getTransactionsByCategory = (category: string) => {
    return transactions.filter(t => t.category === category);
  };

  const getBudgetAnalytics = () => {
    const totalBudget = Object.values(budget).reduce((sum, amount) => sum + amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const categoryAnalytics = categories.map(category => {
      const spent = transactions
        .filter(t => t.category === category.name && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      const budgetAmount = budget[category.name] || 0;
      const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
      
      return {
        category: category.name,
        spent,
        budget: budgetAmount,
        remaining: Math.max(0, budgetAmount - spent),
        percentage,
        status: percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'good',
        color: category.color,
        icon: category.icon
      };
    });

    return {
      totalBudget,
      totalExpenses,
      totalIncome,
      balance: totalIncome - totalExpenses,
      budgetUsed: totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0,
      categoryAnalytics
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CF', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Sauvegarde locale
  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    const savedTransactions = localStorage.getItem('transactions');
    const savedCategories = localStorage.getItem('categories');
    
    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  return {
    budget,
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    updateBudget,
    resetBudget,
    getTransactionsByCategory,
    getBudgetAnalytics,
    addCategory,
    deleteCategory,
    formatCurrency
  };
};
