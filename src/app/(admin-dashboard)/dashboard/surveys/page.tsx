import { SurveyData } from "@/db/dataTypes";
import { displaySurveys } from "@/server/actions";

export default async function Surveys() {
  const surveys = await displaySurveys();

  console.log(surveys);
  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <h1 className="font-extrabold text-xl">Surveys</h1>
      <div className="flex gap-2 flex-wrap">
        {surveys?.map((survey: SurveyData) => {
          return <SurveyCard key={survey.code} {...survey} />;
        })}
      </div>
    </section>
  );
}

function SurveyCard({
  code,
  name,
  length,
  date,
  beverage,
  diet,
  other,
}: SurveyData) {
  const dateToString = date.toLocaleString("en-us", { dateStyle: "long" });

  return (
    <div className={`p-4 bg-white rounded-md`}>
      <i>Party Name: {name ?? "null"}</i>
      <p>arrival date: {dateToString}</p>
      <p>length of stay: {length}</p>
      <p>beverage preference: {beverage}</p>
      <p>dietary restrictions: {diet ?? "none"}</p>
      <p>other notes: {other ?? "none"}</p>
      <b>{code}</b>
    </div>
  );
}
