"use client";

import { SurveyData } from "@/db/dataTypes";
import Link from "next/link";

export default function NextSurvey({ code, name, date }: SurveyData) {
  const today = new Date().setHours(0, 0, 0, 0);
  const daysUntilArrival = (date.getTime() - today) / (24 * 60 * 60 * 1000);

  return (
    <Link
      className={`text-base p-4 bg-slate-100 rounded-md flex gap-4 w-max hover:bg-slate-400`}
      href={`/dashboard/surveys/${code}`}
    >
      <b>{name}</b>
      <p>
        Days Until Arrival: <b>{daysUntilArrival}</b>
      </p>
      <i>{code}</i>
    </Link>
  );
}
