export type SurveyData = {
  length: string;
  name: string;
  code: string;
  date: Date | string;
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
  username: string;
  password: string;
  email?: string | null;
  phone?: number | null;
};
