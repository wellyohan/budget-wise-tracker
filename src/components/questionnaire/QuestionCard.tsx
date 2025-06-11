
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/data/questionnaireQuestions';

interface QuestionCardProps {
  question: Question;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedValue,
  onValueChange
}) => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {question.title}
      </h2>
      
      <RadioGroup 
        value={selectedValue || ''} 
        onValueChange={onValueChange}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div 
            key={option.value}
            className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-blue-50 transition-colors duration-200 animate-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <RadioGroupItem value={option.value} id={option.value} />
            <Label 
              htmlFor={option.value} 
              className="flex-1 cursor-pointer text-gray-700 hover:text-gray-900"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionCard;
