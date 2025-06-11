
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, BarChart3, TrendingUp, Target } from 'lucide-react';

const UserChartsSection = () => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Vos Analyses Financières</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Distribution Chart */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-slate-600" />
              Répartition du Budget
            </CardTitle>
            <CardDescription className="text-slate-600">
              Visualisation de vos catégories de dépenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-8 h-8 text-slate-600" />
                </div>
                <p className="font-medium text-slate-700 mb-2">Aucune donnée disponible</p>
                <p className="text-sm">Définissez votre budget pour voir vos statistiques</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Expenses Chart */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-slate-600" />
              Évolution Mensuelle
            </CardTitle>
            <CardDescription className="text-slate-600">
              Historique de vos revenus et dépenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-slate-600" />
                </div>
                <p className="font-medium text-slate-700 mb-2">Aucune donnée disponible</p>
                <p className="text-sm">Commencez à enregistrer vos transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Progress */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <Target className="w-5 h-5 mr-2 text-slate-600" />
              Objectifs d'Épargne
            </CardTitle>
            <CardDescription className="text-slate-600">
              Progression vers vos objectifs financiers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-slate-600" />
                </div>
                <p className="font-medium text-slate-700 mb-2">Aucun objectif défini</p>
                <p className="text-sm">Fixez vos objectifs d'épargne pour suivre vos progrès</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Health Score */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-slate-600" />
              Score de Santé Financière
            </CardTitle>
            <CardDescription className="text-slate-600">
              Évaluation globale de votre situation financière
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">--</span>
                </div>
                <p className="font-medium text-slate-700 mb-2">Score non calculé</p>
                <p className="text-sm">Complétez votre profil pour obtenir votre score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserChartsSection;
