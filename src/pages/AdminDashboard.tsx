import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Settings, 
  LogOut,
  UserCheck,
  UserX,
  Activity,
  DollarSign,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UserStats {
  total_users: number;
  active_users: number;
  new_users_this_month: number;
  questionnaire_completed: number;
}

const AdminDashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    total_users: 0,
    active_users: 0,
    new_users_this_month: 0,
    questionnaire_completed: 0
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    try {
      // Récupérer les statistiques des utilisateurs
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Calculer les statistiques
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const stats: UserStats = {
        total_users: users?.length || 0,
        active_users: users?.filter(u => !u.is_admin).length || 0,
        new_users_this_month: users?.filter(u => new Date(u.created_at) >= startOfMonth).length || 0,
        questionnaire_completed: users?.filter(u => u.questionnaire_completed).length || 0
      };

      setUserStats(stats);
      setRecentUsers(users?.slice(0, 10) || []);
    } catch (error) {
      console.error('Erreur lors du chargement des données admin:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données administrateur",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
          <p className="text-slate animate-pulse">Chargement du tableau de bord admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Admin */}
      <header className="bg-gradient-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-button flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">WiseBank Admin</h1>
                <p className="text-slate-200 text-sm">Panneau d'administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">
                <span className="font-medium">{user?.user_metadata?.first_name || 'Admin'}</span>
                <span className="ml-2 px-2 py-1 bg-slate-800 rounded-button text-xs">Administrateur</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="text-white border-white hover:bg-white hover:text-slate-700 transition-smooth"
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
        {/* Dashboard Overview */}
        <div className="mb-8 animate-slide-down">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord</h2>
          <p className="text-slate">Vue d'ensemble de la plateforme WiseBank</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="bg-gradient-primary text-white hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.total_users}</div>
              <p className="text-xs text-slate-100">
                Tous les comptes créés
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-slate hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Utilisateurs Actifs</CardTitle>
              <UserCheck className="h-4 w-4 text-primary-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">{userStats.active_users}</div>
              <p className="text-xs text-slate">
                Comptes non-admin
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-slate hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Nouveaux ce mois</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">{userStats.new_users_this_month}</div>
              <p className="text-xs text-slate">
                Inscriptions récentes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-slate hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Questionnaires</CardTitle>
              <Activity className="h-4 w-4 text-primary-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">{userStats.questionnaire_completed}</div>
              <p className="text-xs text-slate">
                Profils complétés
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for detailed sections */}
        <Tabs defaultValue="users" className="space-y-6 animate-fade-in">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-card border-slate rounded-input">
            <TabsTrigger value="users" className="rounded-button text-slate data-[state=active]:bg-gradient-primary data-[state=active]:text-white">Gestion Utilisateurs</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-button text-slate data-[state=active]:bg-gradient-primary data-[state=active]:text-white">Analyses</TabsTrigger>
            <TabsTrigger value="financial" className="rounded-button text-slate data-[state=active]:bg-gradient-primary data-[state=active]:text-white">Données Financières</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-button text-slate data-[state=active]:bg-gradient-primary data-[state=active]:text-white">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card shadow-lg border-slate">
              <CardHeader>
                <CardTitle className="text-slate-800">Utilisateurs Récents</CardTitle>
                <CardDescription className="text-slate">
                  Les 10 derniers utilisateurs inscrits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-slate border rounded-input hover-lift transition-smooth">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-button flex items-center justify-center">
                          <span className="text-primary-blue font-semibold">
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{user.first_name} {user.last_name}</p>
                          <p className="text-sm text-slate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.is_admin && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-button">
                            Admin
                          </span>
                        )}
                        {user.questionnaire_completed && (
                          <span className="px-2 py-1 bg-slate-100 text-primary-blue text-xs rounded-button">
                            Profil complet
                          </span>
                        )}
                        <span className="text-xs text-slate">
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card shadow-lg border-slate">
                <CardHeader>
                  <CardTitle className="text-slate-800">Croissance Utilisateurs</CardTitle>
                  <CardDescription className="text-slate">
                    Évolution du nombre d'utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Graphique de croissance</p>
                      <p className="text-sm">(Fonctionnalité à implémenter)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-lg border-slate">
                <CardHeader>
                  <CardTitle className="text-slate-800">Répartition par Région</CardTitle>
                  <CardDescription className="text-slate">
                    Distribution géographique des utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Graphique répartition</p>
                      <p className="text-sm">(Fonctionnalité à implémenter)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card className="bg-gradient-card shadow-lg border-slate">
              <CardHeader>
                <CardTitle className="text-slate-800">Données Financières Globales</CardTitle>
                <CardDescription className="text-slate">
                  Vue d'ensemble des données financières de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-slate-50 rounded-input">
                    <DollarSign className="w-8 h-8 text-primary-blue mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary-blue">0 FCFA</p>
                    <p className="text-sm text-slate">Volume total géré</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-input">
                    <TrendingUp className="w-8 h-8 text-primary-blue mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary-blue">0</p>
                    <p className="text-sm text-slate">Transactions ce mois</p>
                  </div>
                  <div className="text-center p-6 bg-slate-50 rounded-input">
                    <Activity className="w-8 h-8 text-primary-blue mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary-blue">0</p>
                    <p className="text-sm text-slate">Budgets actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-card shadow-lg border-slate">
              <CardHeader>
                <CardTitle className="text-slate-800">Paramètres Administrateur</CardTitle>
                <CardDescription className="text-slate">
                  Configuration et gestion de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-16 border-slate hover-lift transition-smooth rounded-input">
                    <Settings className="w-5 h-5 mr-3 text-primary-blue" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Configuration système</p>
                      <p className="text-sm text-slate">Paramètres globaux</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-16 border-slate hover-lift transition-smooth rounded-input">
                    <UserCheck className="w-5 h-5 mr-3 text-primary-blue" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Gestion des rôles</p>
                      <p className="text-sm text-slate">Permissions utilisateurs</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-16 border-slate hover-lift transition-smooth rounded-input">
                    <AlertTriangle className="w-5 h-5 mr-3 text-primary-blue" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Alertes système</p>
                      <p className="text-sm text-slate">Notifications admin</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-16 border-slate hover-lift transition-smooth rounded-input">
                    <BarChart3 className="w-5 h-5 mr-3 text-primary-blue" />
                    <div className="text-left">
                      <p className="font-medium text-slate-800">Rapports avancés</p>
                      <p className="text-sm text-slate">Analyses détaillées</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
