
import React from 'react';
import { PasswordRequirements } from '@/utils/validation';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  requirements: PasswordRequirements;
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  requirements,
  password
}) => {
  if (!password) return null;

  const criteriaList = [
    { key: 'minLength', label: 'Au moins 8 caractères (requis)', met: requirements.minLength, required: true },
    { key: 'hasUppercase', label: 'Une lettre majuscule (recommandé)', met: requirements.hasUppercase, required: false },
    { key: 'hasLowercase', label: 'Une lettre minuscule (recommandé)', met: requirements.hasLowercase, required: false },
    { key: 'hasNumber', label: 'Un chiffre (recommandé)', met: requirements.hasNumber, required: false },
    { key: 'hasSpecialChar', label: 'Un caractère spécial (recommandé)', met: requirements.hasSpecialChar, required: false }
  ];

  const requiredMet = requirements.minLength;
  const recommendedCount = criteriaList.filter(c => !c.required && c.met).length;

  return (
    <div className="mt-2 space-y-1">
      <p className="text-sm font-medium text-gray-700">
        Exigences du mot de passe :
      </p>
      {criteriaList.map(({ key, label, met, required }) => (
        <div key={key} className={`flex items-center text-xs ${met ? 'text-green-600' : required ? 'text-red-500' : 'text-gray-500'}`}>
          {met ? (
            <Check className="w-3 h-3 mr-1" />
          ) : (
            <X className="w-3 h-3 mr-1" />
          )}
          <span>{label}</span>
        </div>
      ))}
      {requiredMet && (
        <div className="mt-2 text-xs">
          <span className="text-green-600 font-medium">
            ✓ Mot de passe valide
          </span>
          {recommendedCount > 0 && (
            <span className="text-gray-600 ml-2">
              ({recommendedCount}/4 critères recommandés remplis)
            </span>
          )}
        </div>
      )}
    </div>
  );
};
