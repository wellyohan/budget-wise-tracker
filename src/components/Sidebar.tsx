
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Plus, 
  BarChart3, 
  Settings, 
  Wallet,
  TrendingUp,
  PieChart,
  Calendar,
  Target,
  DollarSign,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: Home,
      badge: '4',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Aperçu général'
    },
    {
      id: 'add',
      label: 'Nouvelle Transaction',
      icon: Plus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Ajouter une dépense/revenu'
    },
    {
      id: 'charts',
      label: 'Analyses Avancées',
      icon: BarChart3,
      badge: 'Nouveau',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Graphiques et tendances'
    },
    {
      id: 'budget',
      label: 'Gestion Budgets',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Configurer vos budgets'
    },
    {
      id: 'categories',
      label: 'Mes Catégories',
      icon: Settings,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Personnaliser les catégories'
    }
  ];

  const quickStats = [
    { label: 'Solde', value: '425 000', unit: 'FCFA', color: 'text-green-600', icon: TrendingUp },
    { label: 'Dépenses', value: '340 000', unit: 'FCFA', color: 'text-red-500', icon: DollarSign },
    { label: 'Budget', value: '625 000', unit: 'FCFA', color: 'text-blue-600', icon: Wallet }
  ];

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header de la sidebar */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <PieChart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Navigation</h2>
                  <p className="text-xs text-gray-600">Menu principal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden hover:bg-red-50"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            {/* Stats rapides */}
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Aperçu Rapide</h3>
              {quickStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                    <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-sm font-bold", stat.color)}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.unit}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Menu principal */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Menu Principal</h3>
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden animate-fade-in",
                    activeTab === item.id
                      ? `${item.bgColor} border border-current ${item.color} shadow-sm`
                      : "hover:bg-gray-50 text-gray-700",
                    hoveredItem === item.id && "transform scale-[1.02]"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    activeTab === item.id ? item.bgColor : "bg-gray-100 group-hover:bg-gray-200"
                  )}>
                    <item.icon className={cn(
                      "h-4 w-4 transition-all duration-300",
                      activeTab === item.id ? item.color : "text-gray-600",
                      hoveredItem === item.id && "rotate-12 scale-110"
                    )} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge 
                        variant={activeTab === item.id ? "default" : "secondary"}
                        className="text-xs animate-pulse"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-all duration-300",
                      activeTab === item.id ? item.color : "text-gray-400",
                      hoveredItem === item.id && "translate-x-1"
                    )} />
                  </div>
                  
                  {/* Effet de survol */}
                  {hoveredItem === item.id && (
                    <div className={cn(
                      "absolute inset-0 opacity-10 animate-fade-in",
                      item.bgColor
                    )} />
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Footer de la sidebar */}
          <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Décembre 2024</div>
                <div className="text-xs text-gray-600">Période actuelle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
