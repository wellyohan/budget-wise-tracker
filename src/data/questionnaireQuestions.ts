
import { DollarSign, TrendingUp, BarChart3, PiggyBank, Target, BookOpen } from 'lucide-react';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  icon: any;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 'monthly_income',
    title: 'Quel est votre revenu mensuel approximatif ?',
    icon: DollarSign,
    options: [
      { value: 'moins_100k', label: 'Moins de 100 000 FCFA' },
      { value: '100k_300k', label: '100 000 - 300 000 FCFA' },
      { value: '300k_500k', label: '300 000 - 500 000 FCFA' },
      { value: '500k_1m', label: '500 000 FCFA - 1 000 000 FCFA' },
      { value: 'plus_1m', label: 'Plus de 1 000 000 FCFA' }
    ]
  },
  {
    id: 'income_source',
    title: 'Quelle est votre principale source de revenus ?',
    icon: TrendingUp,
    options: [
      { value: 'salaire', label: 'Salaire fixe' },
      { value: 'freelance', label: 'Travail indépendant' },
      { value: 'business', label: 'Entreprise propre' },
      { value: 'investissements', label: 'Investissements' },
      { value: 'autre', label: 'Autre' }
    ]
  },
  {
    id: 'main_expenses',
    title: 'Quelles sont vos principales dépenses mensuelles ?',
    icon: BarChart3,
    options: [
      { value: 'logement', label: 'Logement et factures' },
      { value: 'alimentation', label: 'Alimentation' },
      { value: 'transport', label: 'Transport' },
      { value: 'education', label: 'Éducation' },
      { value: 'sante', label: 'Santé' },
      { value: 'loisirs', label: 'Loisirs et sorties' }
    ]
  },
  {
    id: 'monthly_savings',
    title: 'Combien épargnez-vous chaque mois ?',
    icon: PiggyBank,
    options: [
      { value: 'rien', label: 'Je n\'épargne pas actuellement' },
      { value: 'moins_50k', label: 'Moins de 50 000 FCFA' },
      { value: '50k_100k', label: '50 000 - 100 000 FCFA' },
      { value: '100k_200k', label: '100 000 - 200 000 FCFA' },
      { value: 'plus_200k', label: 'Plus de 200 000 FCFA' }
    ]
  },
  {
    id: 'investment_preference',
    title: 'Quel est votre profil d\'investissement ?',
    icon: Target,
    options: [
      { value: 'conservateur', label: 'Conservateur (sécurité avant tout)' },
      { value: 'modere', label: 'Modéré (équilibre risque/rendement)' },
      { value: 'dynamique', label: 'Dynamique (accepte les risques)' },
      { value: 'aucun', label: 'Je ne souhaite pas investir' }
    ]
  },
  {
    id: 'annual_goal',
    title: 'Quel est votre principal objectif financier cette année ?',
    icon: Target,
    options: [
      { value: 'epargne_urgence', label: 'Constituer une épargne d\'urgence' },
      { value: 'achat_immobilier', label: 'Acheter un bien immobilier' },
      { value: 'investir', label: 'Commencer à investir' },
      { value: 'rembourser_dettes', label: 'Rembourser mes dettes' },
      { value: 'voyage', label: 'Financer un voyage' },
      { value: 'education', label: 'Financer l\'éducation' }
    ]
  },
  {
    id: 'financial_education',
    title: 'Comment évaluez-vous vos connaissances financières ?',
    icon: BookOpen,
    options: [
      { value: 'debutant', label: 'Débutant (j\'apprends encore)' },
      { value: 'intermediaire', label: 'Intermédiaire (bases solides)' },
      { value: 'avance', label: 'Avancé (bonne maîtrise)' },
      { value: 'expert', label: 'Expert (très expérimenté)' }
    ]
  }
];
