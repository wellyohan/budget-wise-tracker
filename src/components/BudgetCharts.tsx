import React from 'react';
import { useBudget } from '@/hooks/useBudget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Target, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LabelList,
  PieChart as PieChartComponent,
  Pie as PieComponent,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface CategoryAnalytics {
  category: string;
  spent: number;
  budget: number;
  remaining: number;
  percentage: number;
  status: 'over' | 'warning' | 'good';
  color: string;
  icon: string;
}

interface BudgetAnalytics {
  totalBudget: number;
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  budgetUsed: number;
  categoryAnalytics: CategoryAnalytics[];
}

const BudgetCharts = () => {
  const { getBudgetAnalytics, formatCurrency, categories, transactions } = useBudget();
  const analytics: BudgetAnalytics = getBudgetAnalytics();

  // Données pour le graphique en barres
  const budgetVsExpenses = analytics.categoryAnalytics.map(category => ({
    category: category.category,
    budget: category.budget,
    spent: category.spent,
  }));

  // Données pour le graphique en secteurs
  const expenseDistribution = analytics.categoryAnalytics.map(category => ({
    name: category.category,
    value: category.spent,
  }));

  // Données pour le graphique de tendance temporelle (exemple)
  const trendData = [
    { month: 'Jan', expenses: 200000, budget: 300000, income: 500000 },
    { month: 'Fév', expenses: 250000, budget: 300000, income: 500000 },
    { month: 'Mar', expenses: 180000, budget: 300000, income: 500000 },
    { month: 'Avr', expenses: 300000, budget: 300000, income: 500000 },
    { month: 'Mai', expenses: 220000, budget: 300000, income: 500000 },
    { month: 'Juin', expenses: 280000, budget: 300000, income: 500000 },
  ];

  // Fonction pour obtenir la couleur d'une catégorie
  const getColorForCategory = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : '#8884d8';
  };

  // Composant personnalisé pour le tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((item: any) => (
            <p key={item.dataKey} className="text-gray-700">
              {`${item.name}: ${formatCurrency(item.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 p-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Revenus Totaux</p>
                <p className="text-3xl font-bold text-green-900">
                  {formatCurrency(analytics.totalIncome)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Dépenses Totales</p>
                <p className="text-3xl font-bold text-red-900">
                  {formatCurrency(analytics.totalExpenses)}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "border-2 hover-lift",
          analytics.balance >= 0 
            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200" 
            : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  analytics.balance >= 0 ? "text-blue-700" : "text-orange-700"
                )}>
                  Solde
                </p>
                <p className={cn(
                  "text-3xl font-bold",
                  analytics.balance >= 0 ? "text-blue-900" : "text-orange-900"
                )}>
                  {formatCurrency(analytics.balance)}
                </p>
              </div>
              <div className={cn(
                "p-3 rounded-full",
                analytics.balance >= 0 ? "bg-blue-100" : "bg-orange-100"
              )}>
                <DollarSign className={cn(
                  "h-8 w-8",
                  analytics.balance >= 0 ? "text-blue-600" : "text-orange-600"
                )} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique en barres */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Budget vs Dépenses par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetVsExpenses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#666"
                    fontSize={12}
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                    tick={{ fill: '#666' }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="budget" 
                    fill="#3B82F6" 
                    name="Budget"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList dataKey="budget" position="top" fontSize={10} />
                  </Bar>
                  <Bar 
                    dataKey="spent" 
                    fill="#EF4444" 
                    name="Dépensé"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList dataKey="spent" position="top" fontSize={10} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Graphique en secteurs */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              Répartition des Dépenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChartComponent>
                  <PieComponent
                    data={expenseDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorForCategory(entry.name)} />
                    ))}
                  </PieComponent>
                  <Tooltip content={<CustomTooltip />} />
                </PieChartComponent>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyse détaillée par catégorie */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Analyse Détaillée par Catégorie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.categoryAnalytics.map((category, index) => (
              <div
                key={category.category}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium capitalize">{category.category}</span>
                    <Badge variant={
                      category.status === 'good' ? 'default' :
                      category.status === 'warning' ? 'secondary' : 'destructive'
                    }>
                      {category.percentage.toFixed(0)}%
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                    </div>
                    <div className="text-sm font-medium">
                      Reste: {formatCurrency(category.remaining)}
                    </div>
                  </div>
                </div>
                <Progress 
                  value={Math.min(category.percentage, 100)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Graphique de tendance temporelle */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Évolution des Dépenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fill: '#666' }}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tick={{ fill: '#666' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="Dépenses"
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#EF4444' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Budget"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Revenus"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCharts;
