
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { questions } from '@/data/questionnaireQuestions';
import QuestionCard from '@/components/questionnaire/QuestionCard';
import CompletionScreen from '@/components/questionnaire/CompletionScreen';

const FinancialQuestionnaire = () => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const IconComponent = currentQ.icon;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('questionnaire_responses')
        .insert({
          user_id: user.id,
          monthly_income: answers.monthly_income,
          income_source: answers.income_source,
          main_expenses: answers.main_expenses,
          monthly_savings: answers.monthly_savings,
          investment_preference: answers.investment_preference,
          annual_goal: answers.annual_goal,
          financial_education: answers.financial_education
        });

      if (error) throw error;

      // Marquer le questionnaire comme complété
      const { error: updateError } = await supabase
        .from('users')
        .update({ questionnaire_completed: true })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setIsCompleted(true);
      toast({
        title: "Questionnaire complété !",
        description: "Vos réponses ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  if (isCompleted) {
    return <CompletionScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Question {currentQuestion + 1} sur {questions.length}</CardTitle>
                <CardDescription>Questionnaire de profil financier</CardDescription>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <QuestionCard
            question={currentQ}
            selectedValue={answers[currentQ.id]}
            onValueChange={handleAnswer}
          />

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Précédent</span>
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!answers[currentQ.id] || isSubmitting}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                <span>{isSubmitting ? 'Enregistrement...' : 'Terminer'}</span>
                <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className="flex items-center space-x-2"
              >
                <span>Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialQuestionnaire;
