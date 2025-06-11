
import { useState, useEffect } from 'react';

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownLoading, setHasShownLoading] = useState(false);

  useEffect(() => {
    // Vérifier si l'écran de chargement a déjà été affiché dans cette session
    const hasShown = sessionStorage.getItem('hasShownLoadingScreen');
    
    if (hasShown) {
      setIsLoading(false);
      setHasShownLoading(true);
    } else {
      // Afficher l'écran de chargement pour la première fois
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasShownLoading(true);
        sessionStorage.setItem('hasShownLoadingScreen', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const skipLoading = () => {
    setIsLoading(false);
    setHasShownLoading(true);
    sessionStorage.setItem('hasShownLoadingScreen', 'true');
  };

  return { isLoading, hasShownLoading, skipLoading };
};
