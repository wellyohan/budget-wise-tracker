
export interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface PhoneValidation {
  isValid: boolean;
  message: string;
}

export const validatePassword = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
};

export const isPasswordValid = (password: string): boolean => {
  // Pour la validation finale, on vérifie seulement la longueur minimum
  // Les autres critères sont optionnels mais encouragés
  return password.length >= 8;
};

export const validatePhone = (phone: string): PhoneValidation => {
  // Format attendu: +237 xxx xxx xxx (Cameroun)
  const phoneRegex = /^\+237\s\d{3}\s\d{3}\s\d{3}$/;
  
  if (!phone) {
    return { isValid: false, message: "Le numéro de téléphone est requis" };
  }
  
  if (!phoneRegex.test(phone)) {
    return { 
      isValid: false, 
      message: "Format requis: +237 xxx xxx xxx" 
    };
  }
  
  return { isValid: true, message: "" };
};

export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, message: "L'email est requis" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Format d'email invalide" };
  }
  
  return { isValid: true, message: "" };
};
