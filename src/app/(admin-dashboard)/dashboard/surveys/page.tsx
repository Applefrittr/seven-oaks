import { SurveyData } from "@/db/dataTypes";
//import { displaySurveys } from "@/server/actions";
import SurveyList from "./SurveyList";
import { getAllSurveys } from "@/db/queries";

export default async function Surveys() {
  const data = (await getAllSurveys()) as SurveyData[];

  return <SurveyList data={data} />;
}
