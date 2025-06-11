
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface AuthUser extends User {
  is_admin?: boolean;
  questionnaire_completed?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (userData: UserSignUpData) => Promise<{ error?: string; success?: boolean }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

interface UserSignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  city: string;
  region: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier la session existante
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserData(session.user);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error);
      }
      setLoading(false);
    };

    getInitialSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserData(session.user);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace personnel !",
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        await fetchUserData(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (authUser: User) => {
    try {
      // Essayer de récupérer les données utilisateur, mais ne pas bloquer si ça échoue
      const { data: userData } = await supabase
        .from('users')
        .select('is_admin, questionnaire_completed')
        .eq('id', authUser.id)
        .single();

      setUser({
        ...authUser,
        is_admin: userData?.is_admin || false,
        questionnaire_completed: userData?.questionnaire_completed || false,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      // Même en cas d'erreur, on définit l'utilisateur avec les valeurs par défaut
      setUser({
        ...authUser,
        is_admin: false,
        questionnaire_completed: false,
      } as AuthUser);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Vérifier d'abord si c'est le compte admin test
      if (email === 'admin@wise.com' && password === 'Admin135791986&&') {
        const adminUser: AuthUser = {
          id: '550e8400-e29b-41d4-a716-446655440000',
          aud: 'authenticated',
          role: 'authenticated',
          email: 'admin@wise.com',
          email_confirmed_at: new Date().toISOString(),
          phone: '',
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {
            first_name: 'Admin',
            last_name: 'WiseBank'
          },
          identities: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_admin: true,
          questionnaire_completed: true,
        };
        setUser(adminUser);
        setLoading(false);
        return {};
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        setLoading(false);
        return { error: 'Email ou mot de passe incorrect. Vérifiez vos identifiants.' };
      }

      setLoading(false);
      return {};
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      setLoading(false);
      return { error: 'Erreur de connexion inattendue' };
    }
  };

  const signUp = async (userData: UserSignUpData) => {
    try {
      setLoading(true);
      
      // Créer l'utilisateur SANS vérification d'email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        options: {
          emailRedirectTo: undefined, // Pas de redirection email
          data: {
            first_name: userData.firstName.trim(),
            last_name: userData.lastName.trim(),
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        setLoading(false);
        return { error: authError.message };
      }

      if (authData.user) {
        // Essayer d'insérer les données dans la table users, mais ne pas bloquer si ça échoue
        try {
          await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: userData.email.trim().toLowerCase(),
              first_name: userData.firstName.trim(),
              last_name: userData.lastName.trim(),
              phone: userData.phone,
              country: userData.country,
              city: userData.city.trim(),
              region: userData.region.trim(),
              password_hash: '',
              is_admin: false,
              questionnaire_completed: false,
            });
        } catch (dbError) {
          console.error('Erreur base de données (non bloquante):', dbError);
          // On continue même si l'insertion en base échoue
        }

        // Connecter automatiquement l'utilisateur
        await fetchUserData(authData.user);
        
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return {};
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      setLoading(false);
      return { error: 'Erreur lors de l\'inscription' };
    }
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const isAdmin = user?.is_admin || false;

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
