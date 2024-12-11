import { SurveyData } from "@/db/dataTypes";
import { notFound } from "next/navigation";
import dateToString from "@/lib/dateToString";
import DeleteSurvey from "./DeleteSurvey";
import { getSurvey } from "@/db/queries";

export default async function Survey({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const survey = (await getSurvey(id)) as SurveyData;
  if (!survey) notFound();
  const { name, date, length, beverage, diet, other, code } = survey;
  const stringDate = dateToString(date);

  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <h1 className={`font-extrabold text-xl`}>
        Survey - <i>{id}</i>
      </h1>
      <div className={`p-4 rounded-md bg-white max-w-lg flex flex-col gap-4`}>
        <b>{name}</b>
        <hr className={`border-1 border-black`} />
        <div className={`flex gap-4 flex-wrap sm:flex-nowrap`}>
          <p>
            <i>Arrives:</i> <b>{stringDate}</b>
          </p>
          <p>
            <i>Length of stay:</i> <b>{length} days</b>
          </p>
        </div>
        <p>
          <i>Beverage preference:</i> <b>{beverage}</b>
        </p>
        <div>
          <p>
            <i>Dietary Ristrictions:</i>
          </p>
          <b>{diet}</b>
        </div>
        <div>
          <p>
            <i>Other notes:</i>
          </p>
          <b>{other}</b>
        </div>
        <DeleteSurvey code={code} />
      </div>
    </section>
  );
}
