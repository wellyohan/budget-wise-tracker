
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { Budget, Transaction } from '@/hooks/useBudget';

interface BudgetSummaryProps {
  budget: Budget;
  transactions: Transaction[];
}

const BudgetSummary = ({ budget, transactions }: BudgetSummaryProps) => {
  const totalBudget = Object.values(budget).reduce((sum, amount) => sum + amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const remainingBudget = totalBudget - totalExpenses;
  const budgetUsedPercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Résumé principal */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Résumé Financier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-200 text-sm">Revenus</p>
              <p className="text-2xl font-bold text-green-300">
                +{totalIncome.toLocaleString()} €
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Dépenses</p>
              <p className="text-2xl font-bold text-red-300">
                -{totalExpenses.toLocaleString()} €
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-blue-400">
            <p className="text-blue-200 text-sm">Solde</p>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {balance >= 0 ? '+' : ''}{balance.toLocaleString()} €
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Utilisation du Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Utilisé: {totalExpenses.toLocaleString()} €</span>
              <span>Budget: {totalBudget.toLocaleString()} €</span>
            </div>
            <Progress 
              value={Math.min(budgetUsedPercentage, 100)} 
              className="h-3"
            />
            <p className="text-sm text-gray-600 text-center">
              {budgetUsedPercentage.toFixed(1)}% du budget utilisé
            </p>
          </div>
          
          <div className={`p-3 rounded-lg ${remainingBudget >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2">
              {remainingBudget >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`font-medium ${remainingBudget >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {remainingBudget >= 0 ? 'Reste à dépenser' : 'Dépassement'}: {Math.abs(remainingBudget).toLocaleString()} €
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium capitalize">{transaction.category}</p>
                  <p className="text-sm text-gray-600 truncate">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetSummary;
