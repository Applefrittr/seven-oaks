import { SurveyData } from "@/db/dataTypes";
import { displaySurveys } from "@/server/actions";
import SurveyList from "./SurveyList";

export default async function Surveys() {
  const data = (await displaySurveys()) as SurveyData[];

  return <SurveyList data={data} />;
}
