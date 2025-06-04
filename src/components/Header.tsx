
import { useState } from 'react';
import { Wallet, Menu, X, TrendingUp, PieChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header = ({ onMenuToggle, isMenuOpen }: HeaderProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMenuToggle = () => {
    setIsAnimating(true);
    onMenuToggle();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuToggle}
              className={cn(
                "lg:hidden transition-all duration-300 hover:bg-blue-50",
                isAnimating && "animate-pulse"
              )}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-blue-600 animate-fade-in" />
              ) : (
                <Menu className="h-6 w-6 text-blue-600 animate-fade-in" />
              )}
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Wallet className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 animate-bounce">
                  <TrendingUp className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <div className="animate-fade-in">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  FinanceWise
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Gestionnaire de Budget Intelligent
                </p>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="group hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <PieChart className="h-4 w-4 mr-2 group-hover:animate-spin text-blue-600" />
              Analyses
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="group hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
            >
              <Settings className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300 text-purple-600" />
              Paramètres
            </Button>
            
            <div className="flex items-center gap-2 ml-4 px-3 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
