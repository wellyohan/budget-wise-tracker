
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Monitor, Tablet, ChevronRight, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DemoPreview from '@/components/DemoPreview';

const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mr-3"></div>
              <span className="text-xl font-bold text-gray-900">WiseBank</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="rounded-xl">
                  Connexion
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section avec Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Découvrez WiseBank
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> en Action</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
              Explorez notre interface intuitive et découvrez comment WiseBank peut transformer votre gestion financière au Cameroun.
            </p>
          </div>

          {/* Demo Preview */}
          <div className="mb-20 animate-scale-in">
            <DemoPreview />
          </div>

          {/* Fonctionnalités principales */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Interface Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Navigation fluide et intuitive pour une expérience utilisateur optimale
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Vos données financières sont protégées par les plus hauts standards de sécurité
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Intelligent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Conseils personnalisés et analyses prédictives pour optimiser vos finances
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Responsive Design */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Accessible Partout</h2>
            <div className="flex justify-center items-center space-x-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float-1">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <p className="font-medium">Mobile</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float-2">
                  <Tablet className="w-10 h-10 text-white" />
                </div>
                <p className="font-medium">Tablette</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float-3">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <p className="font-medium">Desktop</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez des milliers d'utilisateurs qui font confiance à WiseBank
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-lg px-8 py-4 rounded-2xl group">
                Créer mon compte gratuitement
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
