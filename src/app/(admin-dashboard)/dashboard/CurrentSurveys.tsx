"use client";

import Link from "next/link";
import { SurveyData } from "@/db/dataTypes";

type CurrentSurveyProps = {
  currentSurveys: SurveyData[] | undefined;
};

export default function CurrentSurveys({ currentSurveys }: CurrentSurveyProps) {
  return (
    <div className={`flex flex-col gap-2 items-end`}>
      {currentSurveys &&
        currentSurveys.length > 0 &&
        currentSurveys.map((survey) => {
          const today = new Date().setHours(0, 0, 0, 0);
          const leavingDate = new Date(survey.date);
          leavingDate.setDate(leavingDate.getDate() + Number(survey.length));

          const daysLeft = Math.floor(
            (leavingDate.getTime() - today) / (24 * 60 * 60 * 1000)
          );

          return (
            <Link
              key={survey.code}
              className={`text-base p-4 bg-slate-100 rounded-md flex gap-4 w-max hover:bg-slate-400`}
              href={`/dashboard/surveys/${survey.code}`}
            >
              <b>{survey.name}</b>
              <p>
                Remaining Days: <b>{daysLeft}</b>
              </p>
              <i>{survey.code}</i>
            </Link>
          );
        })}
      {currentSurveys && currentSurveys.length === 0 && <b>NONE</b>}
    </div>
  );
}
