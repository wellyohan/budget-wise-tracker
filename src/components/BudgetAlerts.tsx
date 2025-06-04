
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';
import { Budget, Transaction } from '@/hooks/useBudget';

interface BudgetAlertsProps {
  budget: Budget;
  transactions: Transaction[];
}

const BudgetAlerts = ({ budget, transactions }: BudgetAlertsProps) => {
  const alerts = [];

  // Vérifier les dépassements de budget par catégorie
  Object.entries(budget).forEach(([category, budgetAmount]) => {
    const spent = transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
    
    if (percentage > 100) {
      alerts.push({
        type: 'danger',
        category,
        title: `Dépassement de budget - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        description: `Vous avez dépassé votre budget de ${(spent - budgetAmount).toLocaleString()}€ (${percentage.toFixed(1)}% du budget).`,
        icon: AlertTriangle
      });
    } else if (percentage > 80) {
      alerts.push({
        type: 'warning',
        category,
        title: `Attention - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        description: `Vous avez utilisé ${percentage.toFixed(1)}% de votre budget (${spent.toLocaleString()}€ sur ${budgetAmount.toLocaleString()}€).`,
        icon: TrendingDown
      });
    }
  });

  // Alert de félicitation si tous les budgets sont respectés
  const allCategoriesUnderBudget = Object.entries(budget).every(([category, budgetAmount]) => {
    const spent = transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return spent <= budgetAmount;
  });

  if (allCategoriesUnderBudget && Object.keys(budget).length > 0) {
    alerts.unshift({
      type: 'success',
      category: 'all',
      title: 'Félicitations !',
      description: 'Vous respectez tous vos budgets ce mois-ci. Continuez ainsi !',
      icon: CheckCircle
    });
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <Alert 
          key={`${alert.category}-${index}`}
          className={`border-l-4 ${
            alert.type === 'danger' 
              ? 'border-l-red-500 bg-red-50' 
              : alert.type === 'warning'
              ? 'border-l-yellow-500 bg-yellow-50'
              : 'border-l-green-500 bg-green-50'
          }`}
        >
          <alert.icon className={`h-4 w-4 ${
            alert.type === 'danger' 
              ? 'text-red-600' 
              : alert.type === 'warning'
              ? 'text-yellow-600'
              : 'text-green-600'
          }`} />
          <AlertTitle className={
            alert.type === 'danger' 
              ? 'text-red-800' 
              : alert.type === 'warning'
              ? 'text-yellow-800'
              : 'text-green-800'
          }>
            {alert.title}
          </AlertTitle>
          <AlertDescription className={
            alert.type === 'danger' 
              ? 'text-red-700' 
              : alert.type === 'warning'
              ? 'text-yellow-700'
              : 'text-green-700'
          }>
            {alert.description}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default BudgetAlerts;
