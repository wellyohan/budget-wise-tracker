<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> ae94c20 (Enregistrement des donnees)
=======

>>>>>>> a6d403c (Initial state before Replit.dev)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
import Index from "./pages/Index";
=======
=======
>>>>>>> a6d403c (Initial state before Replit.dev)
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Demo from "./pages/Demo";
import FinancialQuestionnaire from "./components/FinancialQuestionnaire";
<<<<<<< HEAD
>>>>>>> ae94c20 (Enregistrement des donnees)
=======
>>>>>>> a6d403c (Initial state before Replit.dev)
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

<<<<<<< HEAD
<<<<<<< HEAD
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
=======
=======
>>>>>>> a6d403c (Initial state before Replit.dev)
const AppContent = () => {
  const { isLoading, skipLoading } = useLoadingScreen();

  if (isLoading) {
    return <LoadingScreen onComplete={skipLoading} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/questionnaire" element={<FinancialQuestionnaire />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
<<<<<<< HEAD
>>>>>>> ae94c20 (Enregistrement des donnees)
=======
>>>>>>> a6d403c (Initial state before Replit.dev)
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
