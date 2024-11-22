import { SurveyData } from "@/db/dataTypes";
import { displaySpecificSurvey } from "@/server/actions";
import { notFound } from "next/navigation";
import dateToString from "@/lib/dateToString";
import DeleteSurvey from "./DeleteSurvey";

export default async function Survey({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { name, date, length, beverage, diet, other, code } =
    (await displaySpecificSurvey(id)) as SurveyData;
  if (!code) notFound();

  const stringDate = dateToString(date);

  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <h1 className="font-extrabold text-xl">
        Survey - <i>{id}</i>
      </h1>
      <div
        className={`p-4 rounded-md bg-white w-max max-w-lg flex flex-col gap-4`}
      >
        <b>{name}</b>
        <hr className={`border-1 border-black`} />
        <div className={`flex gap-4`}>
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
