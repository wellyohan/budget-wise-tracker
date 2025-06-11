
import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, BarChart3, TrendingUp, Wallet, Target, CreditCard } from 'lucide-react';

const DemoPreview = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl">
      <div className="flex animate-demo-slide" style={{ width: '400%' }}>
        {/* Écran 1: Dashboard */}
        <div className="w-1/4 flex-shrink-0 p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Dashboard</h3>
                <p className="text-sm text-gray-600">Vue d'ensemble</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-xs text-gray-600">Revenus</p>
                <p className="text-xl font-bold text-green-600">450,000 FCFA</p>
              </div>
              <div className="bg-red-100 p-4 rounded-xl">
                <p className="text-xs text-gray-600">Dépenses</p>
                <p className="text-xl font-bold text-red-600">320,000 FCFA</p>
              </div>
            </div>
            <div className="mt-4 h-20 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl animate-pulse-glow"></div>
          </Card>
        </div>

        {/* Écran 2: Budget */}
        <div className="w-1/4 flex-shrink-0 p-8 bg-gradient-to-br from-green-50 to-emerald-100">
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Budget Mensuel</h3>
                <p className="text-sm text-gray-600">Gestion des dépenses</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Alimentation</span>
                <span className="text-sm font-semibold">85,000 FCFA</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Transport</span>
                <span className="text-sm font-semibold">45,000 FCFA</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Écran 3: Objectifs */}
        <div className="w-1/4 flex-shrink-0 p-8 bg-gradient-to-br from-purple-50 to-violet-100">
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Objectifs</h3>
                <p className="text-sm text-gray-600">Épargne et projets</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-sm font-medium">Voyage en Europe</p>
                <p className="text-xs text-gray-600 mb-2">750,000 FCFA / 1,200,000 FCFA</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl">
                <p className="text-sm font-medium">Fonds d'urgence</p>
                <p className="text-xs text-gray-600 mb-2">320,000 FCFA / 500,000 FCFA</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Écran 4: Analytics */}
        <div className="w-1/4 flex-shrink-0 p-8 bg-gradient-to-br from-orange-50 to-red-100">
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Analytics</h3>
                <p className="text-sm text-gray-600">Tendances et rapports</p>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-orange-100 p-3 rounded-xl">
                <p className="text-xs text-gray-600">Épargne</p>
                <p className="text-lg font-bold text-orange-600">+15%</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <p className="text-xs text-gray-600">Investissement</p>
                <p className="text-lg font-bold text-red-600">+8%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Indicateurs de progression */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '6s' }}></div>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '9s' }}></div>
      </div>
    </div>
  );
};

export default DemoPreview;
