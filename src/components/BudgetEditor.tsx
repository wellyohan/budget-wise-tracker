
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Budget } from '@/hooks/useBudget';
import { Settings, Save, RotateCcw, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BudgetEditorProps {
  budget: Budget;
  categories: string[];
  onUpdateBudget: (category: string, amount: number) => void;
  onResetBudget: () => void;
  analytics: any;
}

const BudgetEditor = ({ budget, categories, onUpdateBudget, onResetBudget, analytics }: BudgetEditorProps) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempBudgets, setTempBudgets] = useState<Budget>(budget);
  const { toast } = useToast();

  const handleSliderChange = (category: string, value: number[]) => {
    setTempBudgets(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const handleInputChange = (category: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setTempBudgets(prev => ({
      ...prev,
      [category]: numValue
    }));
  };

  const saveBudget = (category: string) => {
    onUpdateBudget(category, tempBudgets[category]);
    setEditingCategory(null);
    toast({
      title: "Budget mis à jour",
      description: `Le budget pour ${category} a été mis à jour à ${tempBudgets[category]}€`,
    });
  };

  const cancelEdit = (category: string) => {
    setTempBudgets(prev => ({
      ...prev,
      [category]: budget[category]
    }));
    setEditingCategory(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Gestion des Budgets
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetBudget}
            className="hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => {
          const categoryData = analytics.categoryAnalytics.find((c: any) => c.category === category);
          const isEditing = editingCategory === category;
          
          return (
            <div 
              key={category} 
              className="p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold capitalize text-lg">{category}</h3>
                  {getStatusIcon(categoryData?.status || 'good')}
                  <Badge className={getStatusColor(categoryData?.status || 'good')}>
                    {categoryData?.percentage.toFixed(0)}% utilisé
                  </Badge>
                </div>
                
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCategory(category)}
                    className="hover:scale-105 transition-transform"
                  >
                    Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => saveBudget(category)}
                      className="hover:scale-105 transition-transform"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Sauver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelEdit(category)}
                      className="hover:scale-105 transition-transform"
                    >
                      Annuler
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor={`budget-${category}`} className="text-sm font-medium">
                    Budget mensuel
                  </Label>
                  <Input
                    id={`budget-${category}`}
                    type="number"
                    value={tempBudgets[category]}
                    onChange={(e) => handleInputChange(category, e.target.value)}
                    disabled={!isEditing}
                    className={`transition-all ${isEditing ? 'border-blue-300 focus:border-blue-500' : 'bg-gray-50'}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ajustement rapide</Label>
                  <Slider
                    value={[tempBudgets[category]]}
                    onValueChange={(value) => handleSliderChange(category, value)}
                    max={2000}
                    min={0}
                    step={50}
                    disabled={!isEditing}
                    className={`transition-all ${!isEditing ? 'opacity-50' : ''}`}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0€</span>
                    <span>2000€</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Dépensé: </span>
                    <span className="font-semibold">{categoryData?.spent.toLocaleString()}€</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Restant: </span>
                    <span className={`font-semibold ${categoryData?.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {categoryData?.remaining.toLocaleString()}€
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        categoryData?.percentage > 100 ? 'bg-red-500' :
                        categoryData?.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(categoryData?.percentage || 0, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Résumé global */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
          <h3 className="font-semibold mb-3">Résumé Global</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{analytics.totalBudget.toLocaleString()}€</div>
              <div className="text-sm opacity-90">Budget Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{analytics.totalExpenses.toLocaleString()}€</div>
              <div className="text-sm opacity-90">Dépenses</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{analytics.budgetUsed.toFixed(1)}%</div>
              <div className="text-sm opacity-90">Utilisé</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${analytics.balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {analytics.balance.toLocaleString()}€
              </div>
              <div className="text-sm opacity-90">Solde</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetEditor;
