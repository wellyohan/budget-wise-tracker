
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBudget } from '@/hooks/useBudget';
import AddTransaction from '@/components/AddTransaction';
import BudgetCharts from '@/components/BudgetCharts';
import BudgetSummary from '@/components/BudgetSummary';
import BudgetAlerts from '@/components/BudgetAlerts';
import BudgetEditor from '@/components/BudgetEditor';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CategoryManager from '@/components/CategoryManager';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { 
    budget, 
    transactions, 
    addTransaction, 
    updateBudget, 
    resetBudget, 
    categories, 
    getBudgetAnalytics,
    addCategory,
    deleteCategory,
    formatCurrency
  } = useBudget();
  
  const analytics = getBudgetAnalytics();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
        />

        {/* Contenu de la page */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Alertes Budget */}
          <div className="mb-8 animate-fade-in">
            <BudgetAlerts budget={budget} transactions={transactions} />
          </div>

          {/* Contenu par onglet */}
          <div className="animate-fade-in">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Statistiques principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm font-medium">Solde Total</p>
                          <p className="text-3xl font-bold">
                            {formatCurrency(analytics.balance)}
                          </p>
                        </div>
                        <TrendingUp className="h-12 w-12 text-green-200 animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm font-medium">Budget Total</p>
                          <p className="text-3xl font-bold">
                            {formatCurrency(analytics.totalBudget)}
                          </p>
                        </div>
                        <BarChart3 className="h-12 w-12 text-blue-200 animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-100 text-sm font-medium">Dépenses</p>
                          <p className="text-3xl font-bold">
                            {formatCurrency(analytics.totalExpenses)}
                          </p>
                        </div>
                        <DollarSign className="h-12 w-12 text-red-200 animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Vue d'ensemble détaillée */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <BudgetSummary budget={budget} transactions={transactions} />
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="bg-white shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          Répartition par Catégories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analytics.categoryAnalytics.map((categoryData: any, index: number) => (
                            <Card key={categoryData.category} 
                              className={cn(
                                "hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in border-l-4",
                                categoryData.percentage > 100 ? 'border-l-red-500' : 
                                categoryData.percentage > 80 ? 'border-l-yellow-500' : 'border-l-green-500'
                              )}
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">{categoryData.icon}</span>
                                    <span className="font-medium capitalize text-gray-900">
                                      {categoryData.category}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-600 font-medium">
                                    {formatCurrency(categoryData.spent)} / {formatCurrency(categoryData.budget)}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                                  <div 
                                    className={cn(
                                      "h-3 rounded-full transition-all duration-1000 ease-out",
                                      categoryData.percentage > 100 ? 'bg-red-500' : 
                                      categoryData.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                    )}
                                    style={{ 
                                      width: `${Math.min(categoryData.percentage, 100)}%`,
                                      animationDelay: `${index * 200}ms`
                                    }}
                                  />
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">
                                    {categoryData.percentage.toFixed(1)}% utilisé
                                  </span>
                                  <span className={cn(
                                    "text-xs font-medium",
                                    categoryData.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                                  )}>
                                    {categoryData.remaining >= 0 ? 'Reste: ' : 'Dépassement: '}
                                    {formatCurrency(Math.abs(categoryData.remaining))}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'add' && (
              <AddTransaction 
                onAddTransaction={addTransaction} 
                categories={categories.map(c => c.name)} 
              />
            )}

            {activeTab === 'charts' && (
              <BudgetCharts 
                budget={budget} 
                transactions={transactions} 
                categories={categories.map(c => c.name)} 
              />
            )}

            {activeTab === 'budget' && (
              <BudgetEditor 
                budget={budget} 
                categories={categories.map(c => c.name)} 
                onUpdateBudget={updateBudget}
                onResetBudget={resetBudget}
                analytics={analytics}
              />
            )}

            {activeTab === 'categories' && (
              <CategoryManager
                categories={categories}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
                formatCurrency={formatCurrency}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
