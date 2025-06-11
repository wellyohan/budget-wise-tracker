
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> a6d403c (Initial state before Replit.dev)
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, PieChart, Target, ArrowRight, Smartphone, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-slate bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary-blue">
              WiseBank
            </h1>
          </div>
          <Link to="/auth">
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth rounded-button">
              Se connecter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Votre{' '}
            <span className="text-primary-blue">
              Portefeuille Intelligent
            </span>{' '}
            Personnalisé
          </h2>
          <p className="text-xl text-slate mb-8 leading-relaxed">
            Gérez vos finances avec intelligence grâce à l'IA, suivez vos budgets en temps réel,
            et recevez des conseils financiers personnalisés pour atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3 rounded-button transition-smooth hover-lift">
                Commencer Gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 rounded-button border-slate text-slate hover:bg-slate-50 transition-smooth">
                Voir la Démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Fonctionnalités Intelligentes
          </h3>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Des outils puissants pour transformer votre gestion financière
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-slate shadow-xl bg-gradient-card hover:shadow-2xl transition-smooth hover-lift rounded-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">Budgets Intelligents</CardTitle>
              <CardDescription className="text-slate">
                Répartition automatique de votre budget avec des conseils IA personnalisés
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate shadow-xl bg-gradient-card hover:shadow-2xl transition-smooth hover-lift rounded-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">Analyses Prédictives</CardTitle>
              <CardDescription className="text-slate">
                Prédictions de votre évolution financière basées sur vos habitudes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate shadow-xl bg-gradient-card hover:shadow-2xl transition-smooth hover-lift rounded-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">Objectifs Personnalisés</CardTitle>
              <CardDescription className="text-slate">
                Définissez et atteignez vos objectifs financiers avec un suivi intelligent
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate shadow-xl bg-gradient-card hover:shadow-2xl transition-smooth hover-lift rounded-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">Sécurité Avancée</CardTitle>
              <CardDescription className="text-slate">
                Chiffrement de bout en bout et protection de vos données sensibles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate shadow-xl bg-gradient-card hover:shadow-2xl transition-smooth hover-lift rounded-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">Interface Intuitive</CardTitle>
              <CardDescription className="text-slate">
                Design moderne et ergonomique pour une expérience utilisateur optimale
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate shadow-xl bg-gradient-card hover:shadow-2xl transition-smooth hover-lift rounded-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">Conseils IA</CardTitle>
              <CardDescription className="text-slate">
                Recommandations financières intelligentes basées sur les tendances du marché
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à Transformer Votre Gestion Financière ?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui font confiance à WiseBank
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 rounded-button bg-white text-primary-blue hover:bg-slate-50 transition-smooth hover-lift">
              Créer Mon Compte Gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">WiseBank</h4>
            </div>
            <p className="text-slate-400 mb-4">
              Votre partenaire pour une gestion financière intelligente
            </p>
            <p className="text-sm text-slate-500">
              © 2024 WiseBank. Tous droits réservés. | Monnaie: FCFA
            </p>
          </div>
        </div>
      </footer>
<<<<<<< HEAD
>>>>>>> ae94c20 (Enregistrement des donnees)
=======
>>>>>>> a6d403c (Initial state before Replit.dev)
    </div>
  );
};

export default Index;
