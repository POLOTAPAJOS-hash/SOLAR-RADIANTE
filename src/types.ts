export interface ServiceItem {
  id: string;
  title: string;
  category: 'solar' | 'eletrica' | 'subestacao' | 'bombeamento' | 'manutencao';
  tagline: string;
  description: string;
  features: string[];
  iconName: string;
  badge?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Residencial' | 'Comercial' | 'Agronegócio' | 'Industrial' | 'Subestação';
  location: string;
  power: string;
  savings: string;
  panelsCount: number;
  image: string;
  description: string;
  completionYear: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'geral' | 'economia' | 'bombeamento' | 'subestacao' | 'financiamento';
}

export interface SolarCalculationResult {
  monthlyBill: number;
  monthlySavings: number;
  annualSavings: number;
  twentyFiveYearSavings: number;
  estimatedPanels: number;
  systemPowerKwp: number;
  requiredAreaM2: number;
  estimatedInvestment: number;
  paybackYears: number;
  co2SavedTonsYear: number;
  treesPlantedEquivalent: number;
}

export interface PumpingCalculationResult {
  dailyVolumeLiters: number;
  depthMeters: number;
  distanceMeters: number;
  recommendedPowerHp: number;
  estimatedPanels: number;
  dailyHoursSun: number;
  flowRateLitersPerHour: number;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  propertyType: string;
  monthlyBill: string;
  interestedServices: string[];
  notes: string;
  billFile?: File | null;
}
