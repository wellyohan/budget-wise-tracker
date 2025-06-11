import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, Mail, Lock, MapPin, Building, Flag, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { 
  validatePassword, 
  isPasswordValid, 
  validateEmail,
  PhoneValidation 
} from '@/utils/validation';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [mounted, setMounted] = useState(false);

  // États pour les formulaires
  const [adminLoginData, setAdminLoginData] = useState({
    email: '',
    password: '',
  });

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: 'Cameroun',
    city: '',
    region: '',
  });

  // États de validation
  const [passwordRequirements, setPasswordRequirements] = useState(validatePassword(''));
  const [phoneValidation, setPhoneValidation] = useState<PhoneValidation>({ isValid: true, message: '' });
  const [emailValidation, setEmailValidation] = useState({ isValid: true, message: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
          <p className="text-slate-600 animate-pulse">Chargement de votre session...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(adminLoginData.email, adminLoginData.password);
    
    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(userLoginData.email, userLoginData.password);
    
    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    const emailVal = validateEmail(signUpData.email);
    if (!emailVal.isValid) {
      toast({
        title: "Erreur",
        description: emailVal.message,
        variant: "destructive",
      });
      return;
    }

    if (!isPasswordValid(signUpData.password)) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (!phoneValidation.isValid) {
      toast({
        title: "Erreur",
        description: "Le numéro de téléphone n'est pas valide",
        variant: "destructive",
      });
      return;
    }

    if (!signUpData.firstName.trim() || !signUpData.lastName.trim() || 
        !signUpData.city.trim() || !signUpData.region.trim()) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error, success } = await signUp({
      email: signUpData.email,
      password: signUpData.password,
      firstName: signUpData.firstName.trim(),
      lastName: signUpData.lastName.trim(),
      phone: signUpData.phone,
      country: signUpData.country,
      city: signUpData.city.trim(),
      region: signUpData.region.trim(),
    });

    if (error) {
      toast({
        title: "Erreur d'inscription",
        description: error,
        variant: "destructive",
      });
    } else if (success) {
      setShowSuccessMessage(true);
      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé avec succès. Vous êtes maintenant connecté.",
      });
    }

    setIsLoading(false);
  };

  const handlePasswordChange = (password: string) => {
    setSignUpData({ ...signUpData, password });
    setPasswordRequirements(validatePassword(password));
  };

  const handleEmailChange = (email: string) => {
    setSignUpData({ ...signUpData, email });
    setEmailValidation(validateEmail(email));
  };

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-scale-in rounded-2xl shadow-lg border border-slate-200">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-slate-600 mx-auto mb-4 animate-bounce" />
            <CardTitle className="text-slate-800">Bienvenue sur WiseBank !</CardTitle>
            <CardDescription>
              Votre compte a été créé avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
              <p className="font-medium text-slate-800 mb-2">✨ Félicitations !</p>
              <p>Vous allez être redirigé vers votre tableau de bord.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-5xl">
        {/* Header avec animation */}
        <div className="text-center mb-8 animate-slide-down">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-3">
            WiseBank
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Votre portefeuille intelligent personnalisé
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-700 to-slate-900 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="animate-slide-up">
          <Tabs defaultValue="user-login" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-slate-200">
              <TabsTrigger value="user-login" className="flex items-center gap-2 data-[state=active]:bg-slate-600 data-[state=active]:text-white transition-all duration-300 rounded-xl">
                <User className="w-4 h-4" />
                Connexion
              </TabsTrigger>
              <TabsTrigger value="admin-login" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-all duration-300 rounded-xl">
                <Shield className="w-4 h-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all duration-300 rounded-xl">
                <User className="w-4 h-4" />
                Inscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user-login" className="animate-fade-in">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <User className="w-5 h-5" />
                    Connexion Utilisateur
                  </CardTitle>
                  <CardDescription>
                    Accédez à votre espace personnel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUserLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                          value={userLoginData.email}
                          onChange={(e) => setUserLoginData({ ...userLoginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-password">Mot de passe</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                          value={userLoginData.password}
                          onChange={(e) => setUserLoginData({ ...userLoginData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg rounded-xl" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Connexion...
                        </div>
                      ) : 'Se connecter'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin-login" className="animate-fade-in">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <Shield className="w-5 h-5" />
                    Connexion Administrateur
                  </CardTitle>
                  <CardDescription>
                    Accès réservé aux administrateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email Administrateur</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@wise.com"
                          className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                          value={adminLoginData.email}
                          onChange={(e) => setAdminLoginData({ ...adminLoginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Mot de passe</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="admin-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                          value={adminLoginData.password}
                          onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg rounded-xl" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Connexion...
                        </div>
                      ) : 'Connexion Admin'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup" className="animate-fade-in">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-slate-700">Créer un compte</CardTitle>
                  <CardDescription>
                    Rejoignez WiseBank pour gérer vos finances intelligemment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          placeholder="Votre prénom"
                          className="border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                          value={signUpData.firstName}
                          onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          placeholder="Votre nom"
                          className="border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                          value={signUpData.lastName}
                          onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          className={`pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl ${!emailValidation.isValid && signUpData.email ? 'border-red-500' : ''}`}
                          value={signUpData.email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          required
                        />
                      </div>
                      {!emailValidation.isValid && signUpData.email && (
                        <p className="text-xs text-red-500">{emailValidation.message}</p>
                      )}
                    </div>

                    <PhoneInput
                      value={signUpData.phone}
                      onChange={(phone) => setSignUpData({ ...signUpData, phone })}
                      onValidationChange={setPhoneValidation}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays *</Label>
                        <div className="relative group">
                          <Flag className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                          <Input
                            id="country"
                            placeholder="Cameroun"
                            className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                            value={signUpData.country}
                            onChange={(e) => setSignUpData({ ...signUpData, country: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">Région *</Label>
                        <div className="relative group">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                          <Input
                            id="region"
                            placeholder="Centre"
                            className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                            value={signUpData.region}
                            onChange={(e) => setSignUpData({ ...signUpData, region: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <div className="relative group">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                          <Input
                            id="city"
                            placeholder="Yaoundé"
                            className="pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl"
                            value={signUpData.city}
                            onChange={(e) => setSignUpData({ ...signUpData, city: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe *</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className={`pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl ${!isPasswordValid(signUpData.password) && signUpData.password ? 'border-red-500' : ''}`}
                          value={signUpData.password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          required
                        />
                      </div>
                      <PasswordStrengthIndicator 
                        requirements={passwordRequirements}
                        password={signUpData.password}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className={`pl-10 border-slate-200 focus:border-slate-500 focus:ring-slate-200 transition-all duration-300 rounded-xl ${signUpData.password !== signUpData.confirmPassword && signUpData.confirmPassword ? 'border-red-500' : ''}`}
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                      {signUpData.password !== signUpData.confirmPassword && signUpData.confirmPassword && (
                        <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg rounded-xl" 
                      disabled={
                        isLoading || 
                        !isPasswordValid(signUpData.password) || 
                        !phoneValidation.isValid ||
                        !emailValidation.isValid ||
                        signUpData.password !== signUpData.confirmPassword
                      }
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Création...
                        </div>
                      ) : 'Créer mon compte'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
