
import React from 'react';
import { Wallet, TrendingUp, Shield } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2500); // Réduit à 2.5s pour plus de fluidité
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo principal avec animation */}
        <div className="relative mb-8">
          <div className="animate-pulse-professional">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl">
              <Wallet className="w-12 h-12 text-white animate-float-gentle" />
            </div>
          </div>
          
          {/* Cercles animés autour du logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-slate-400/30 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-2 border-slate-400/20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Nom de l'application */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          WiseBank
        </h1>
        <p className="text-xl text-slate-300 mb-8 animate-fade-in-delay">
          Votre portefeuille intelligent personnalisé
        </p>

        {/* Icônes flottantes avec nouvelle palette */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="animate-float-gentle" style={{ animationDelay: '0s' }}>
            <div className="w-12 h-12 bg-slate-700/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 text-slate-300" />
            </div>
          </div>
          <div className="animate-float-gentle" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 bg-slate-700/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6 text-slate-300" />
            </div>
          </div>
          <div className="animate-float-gentle" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 bg-slate-700/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-6 h-6 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Barre de progression moderne */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary rounded-full animate-loading-bar"></div>
          </div>
          <p className="text-slate-400 text-sm mt-3 animate-pulse">
            Initialisation...
          </p>
        </div>
      </div>

      {/* Particules flottantes subtiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-400/30 rounded-full animate-float-gentle"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-slate-400/20 rounded-full animate-float-gentle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-slate-400/25 rounded-full animate-float-gentle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-slate-400/30 rounded-full animate-float-gentle" style={{ animationDelay: '2.5s' }}></div>
      </div>
    </div>
  );
};
