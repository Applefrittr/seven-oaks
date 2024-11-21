import { displaySpecificSurvey, displaySurveys } from "@/server/actions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const surveys = await displaySurveys();

  return surveys?.map((survey) => {
    return { code: survey.code };
  });
}

export default async function Survey({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  const data = await displaySpecificSurvey(code);
  if (!data) notFound();

  console.log(data);
  return (
    <section>
      <h1>Specific Survey Page: {code}</h1>
    </section>
  );
}
