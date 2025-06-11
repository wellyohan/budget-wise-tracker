
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const CompletionScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">Questionnaire Complété !</CardTitle>
          <CardDescription>
            Merci pour vos réponses. Nous allons personnaliser votre expérience financière.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => window.location.href = '/dashboard'} 
            className="w-full bg-gradient-to-r from-green-600 to-blue-600"
          >
            Accéder à mon tableau de bord
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletionScreen;
