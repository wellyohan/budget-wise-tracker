
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (name: string, icon: string, color: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  formatCurrency: (amount: number) => string;
}

const CategoryManager = ({ categories, onAddCategory, onDeleteCategory, formatCurrency }: CategoryManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📋', color: '#3B82F6' });

  const predefinedIcons = ['🍽️', '🏠', '🚗', '🎮', '👕', '💊', '📚', '✈️', '💄', '🏋️', '🎬', '🛒', '💻', '📱', '⚡', '🌐'];
  const predefinedColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      onAddCategory(newCategory.name.trim(), newCategory.icon, newCategory.color);
      setNewCategory({ name: '', icon: '📋', color: '#3B82F6' });
      setIsAdding(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Toutes les transactions associées seront également supprimées.')) {
      onDeleteCategory(categoryId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Edit3 className="h-5 w-5 text-white" />
                </div>
                Mes Catégories
              </CardTitle>
              <p className="text-gray-600 mt-1">Gérez vos catégories de dépenses personnalisées</p>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={isAdding}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Catégorie
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Formulaire d'ajout */}
      {isAdding && (
        <Card className="border-2 border-blue-200 shadow-lg animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">Créer une nouvelle catégorie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la catégorie</label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Restaurant, Shopping..."
                className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icône</label>
              <div className="grid grid-cols-8 gap-2">
                {predefinedIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all duration-300 hover:scale-110",
                      newCategory.icon === icon
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <span className="text-xl">{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
              <div className="grid grid-cols-8 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110",
                      newCategory.color === color
                        ? "border-gray-800 shadow-lg"
                        : "border-gray-300"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleAddCategory}
                className="flex-1 bg-green-600 hover:bg-green-700 transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                Créer
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewCategory({ name: '', icon: '📋', color: '#3B82F6' });
                }}
                className="flex-1 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des catégories existantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in border-l-4"
            style={{ 
              borderLeftColor: category.color,
              animationDelay: `${index * 100}ms`
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg text-white font-bold"
                    style={{ backgroundColor: category.color }}
                  >
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {category.name}
                    </h3>
                    <Badge variant="outline" className="text-xs mt-1">
                      Personnalisée
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
                >
                  <Trash2 className="h-4 w-4 group-hover:animate-bounce" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && !isAdding && (
        <Card className="border-2 border-dashed border-gray-300 animate-fade-in">
          <CardContent className="p-8 text-center">
            <div className="text-gray-500 mb-4">
              <Edit3 className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-lg font-medium">Aucune catégorie personnalisée</h3>
              <p className="text-sm">Créez vos premières catégories pour organiser vos finances</p>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer ma première catégorie
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryManager;
