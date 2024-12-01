import { SurveyData } from "@/db/dataTypes";
import SurveyList from "./SurveyList";
import { getUpcomingSurveys } from "@/db/queries";

export default async function Surveys() {
  const data = (await getUpcomingSurveys()) as SurveyData[];

  return <SurveyList data={data} />;
}
