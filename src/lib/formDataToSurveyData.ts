import { SurveyData } from "@/db/dataTypes";

export default function formDataToSurveyData(formData: FormData) {
  const surveyData = Object.fromEntries(formData) as unknown as SurveyData;

  return surveyData;
}
