export interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  category: string;
  startDate: string;
  renewalDate: string;
  notes?: string;
}

export interface UserSettings {
  preferredCurrency: string;
  notificationDays: number[];
  theme: 'light' | 'dark';
  soundEnabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
