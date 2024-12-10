export type SurveyData = {
  length: string;
  name: string;
  code: string;
  date: Date;
  beverage: string;
  diet: string;
  other: string;
};

export type SurveyCode = {
  id: number;
  code: string;
  assigned: boolean;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email?: string | null;
  phone?: number | null;
  email_notifications: boolean | null;
  admin: boolean;
};

export type DashboardMetrics = {
  surveysTotal: number;
  surveys30: number;
  currentSurveys: SurveyData[];
  nextSurvey: SurveyData;
  upcomingSurveys: SurveyData[];
  beveragePref: string;
};
