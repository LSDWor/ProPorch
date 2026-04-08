export interface MaterialItem {
  item: string;
  quantity: string;
}

export interface WeatherData {
  temp: string;
  condition: string;
  tomorrowTemp: string;
  tomorrowCondition: string;
}

export interface ProjectData {
  address: string;
  installType: string;
  installDate: string;
  timeWindow: string;
  status: "Not Started" | "Scheduled" | "In Progress" | "Completed" | "Materials Delivered";
  projectManager: {
    name: string;
    phone: string;
    email: string;
  };
  crewLead: string;
  materials: MaterialItem[];
  weather: WeatherData;
}

export interface Message {
  id: string;
  sender: 'client' | 'contractor';
  text: string;
  time: string;
  read: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'contract';
  size: string;
  date: string;
}

export interface Referral {
  id: string;
  name: string;
  status: 'pending' | 'signed_up' | 'completed';
  reward: string;
  date: string;
}

export interface QuoteData {
  serviceType: string;
  description: string;
  lineItems: { label: string; amount: number }[];
  total: number;
  estimatedDays: string;
}

export type TabId = 'home' | 'projects' | 'quote' | 'referrals' | 'account';

export type AppView = 'landing' | 'demo';
