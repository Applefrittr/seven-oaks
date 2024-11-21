import { displaySpecificSurvey } from "@/server/actions";
import { notFound } from "next/navigation";

export default async function Survey({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  const data = await displaySpecificSurvey(code);
  if (!data) notFound();

  return (
    <section>
      <h1>Specific Survey Page: {code}</h1>
    </section>
  );
}
