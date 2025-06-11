
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, TrendingUp, Wallet, PieChart, Target, Sparkles, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import MarketChart from '@/components/dashboard/MarketChart';
import UserChartsSection from '@/components/dashboard/UserChartsSection';

const Dashboard = () => {
  const { user, signOut, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (user && !isAdmin && !loading) {
      fetchUserProfile();
    }
  }, [user, isAdmin, loading]);

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erreur lors du chargement du profil:', error);
      }
      
      setUserProfile(profile || {});
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      setUserProfile({});
    } finally {
      setProfileLoading(false);
    }
  };

  // Écran de chargement simplifié
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
          <p className="text-slate-600 animate-pulse">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Rediriger les admins vers leur dashboard spécialisé
  if (isAdmin) {
    return <AdminDashboard />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const handleQuestionnaireClick = () => {
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header utilisateur */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  WiseBank
                </h1>
                <p className="text-sm text-slate-600">Votre espace personnel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-700">
                <span className="font-medium">
                  Bienvenue, {user?.user_metadata?.first_name || user?.email?.split('@')[0]}
                </span>
                <span className="ml-2 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                  Utilisateur
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Votre Tableau de Bord
          </h2>
          <p className="text-slate-600 text-lg">
            Gérez vos finances intelligemment avec votre portefeuille personnalisé
          </p>
        </div>

        {/* Afficher automatiquement le questionnaire si non complété */}
        {userProfile && !userProfile.questionnaire_completed && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-slate-600 to-slate-700 text-white border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Complétez votre profil financier
                </CardTitle>
                <CardDescription className="text-slate-200">
                  Répondez à quelques questions pour personnaliser votre expérience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleQuestionnaireClick}
                  className="bg-white text-slate-700 hover:bg-slate-100"
                >
                  Commencer le questionnaire
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Market Trends Section */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-slate-600" />
                Tendances du Marché Régional
              </CardTitle>
              <CardDescription className="text-slate-600">
                Variations des prix d'actifs en temps réel dans votre région
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketChart />
            </CardContent>
          </Card>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Budget Total</CardTitle>
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">0 FCFA</div>
              <p className="text-xs text-slate-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Dépenses</CardTitle>
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-700">0 FCFA</div>
              <p className="text-xs text-slate-500 flex items-center mt-1">
                +0% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Épargne</CardTitle>
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">0 FCFA</div>
              <p className="text-xs text-slate-500">
                Objectif mensuel
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Catégories</CardTitle>
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <PieChart className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">0</div>
              <p className="text-xs text-slate-500">
                Catégories créées
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Charts Section */}
        <UserChartsSection />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Actions Rapides</CardTitle>
              <CardDescription className="text-slate-600">
                Commencez à gérer vos finances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleQuestionnaireClick}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg" 
                variant="default"
              >
                <Settings className="w-4 h-4 mr-2" />
                Compléter le questionnaire financier
              </Button>
              <Button className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg" variant="default">
                <Wallet className="w-4 h-4 mr-2" />
                Définir mon budget
              </Button>
              <Button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg" variant="default">
                <PieChart className="w-4 h-4 mr-2" />
                Créer des catégories
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Conseils Financiers</CardTitle>
              <CardDescription className="text-slate-600">
                Recommandations personnalisées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-slate-600" />
                </div>
                <p className="font-medium text-slate-700 mb-2">Optimisez vos finances</p>
                <p className="text-sm">Complétez votre profil pour recevoir des conseils personnalisés</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
