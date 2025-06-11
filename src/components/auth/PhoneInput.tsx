
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import { validatePhone, PhoneValidation } from '@/utils/validation';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange: (validation: PhoneValidation) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange, 
  onValidationChange 
}) => {
  const [validation, setValidation] = useState<PhoneValidation>({ isValid: true, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Auto-formatage pour le Cameroun
    if (inputValue && !inputValue.startsWith('+237')) {
      if (inputValue.startsWith('237')) {
        inputValue = '+' + inputValue;
      } else if (inputValue.match(/^\d/)) {
        inputValue = '+237 ' + inputValue;
      }
    }
    
    // Formatage automatique des espaces
    if (inputValue.startsWith('+237 ')) {
      const numbers = inputValue.replace('+237 ', '').replace(/\s/g, '');
      if (numbers.length <= 9) {
        const formatted = numbers.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
        if (formatted) {
          inputValue = '+237' + 
            (formatted[1] ? ' ' + formatted[1] : '') +
            (formatted[2] ? ' ' + formatted[2] : '') +
            (formatted[3] ? ' ' + formatted[3] : '');
        }
      }
    }
    
    onChange(inputValue);
    
    const phoneValidation = validatePhone(inputValue);
    setValidation(phoneValidation);
    onValidationChange(phoneValidation);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Téléphone</Label>
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id="phone"
          type="tel"
          placeholder="+237 xxx xxx xxx"
          className={`pl-10 ${!validation.isValid && value ? 'border-red-500' : ''}`}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      {!validation.isValid && value && (
        <p className="text-xs text-red-500 mt-1">{validation.message}</p>
      )}
      {value && validation.isValid && (
        <p className="text-xs text-green-600 mt-1">✓ Format valide</p>
      )}
    </div>
  );
};
