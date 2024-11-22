"use client";

import { SurveyData } from "@/db/dataTypes";
import { useState } from "react";
import { sortSurveys } from "@/server/actions";
import Link from "next/link";
import dateToString from "@/lib/dateToString";

type SurveyListProps = {
  data: SurveyData[];
};

export default function SurveyList({ data }: SurveyListProps) {
  const [surveys, setSurveys] = useState<SurveyData[]>(data);

  async function sort(param: string) {
    const data = (await sortSurveys(param)) as SurveyData[];
    setSurveys(data);
  }

  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <div className="flex gap-4">
        <h1 className="font-extrabold text-xl">Surveys</h1>
        <SortBtn sort={sort} />
      </div>
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4">
        <div className={`col-span-full grid grid-cols-subgrid`}>
          <b>Party Name</b>
          <b>Arrival Date</b>
          <b>Length of Stay</b>
          <b>Survey Code</b>
        </div>
        {surveys?.map((survey: SurveyData) => {
          return <SurveyCard key={survey.code} {...survey} />;
        })}
      </div>
    </section>
  );
}

function SurveyCard({ code, name, length, date }: SurveyData) {
  const stringDate = dateToString(date);

  return (
    <Link
      href={`/dashboard/surveys/${code}`}
      className={`p-4 bg-white rounded-md col-span-full grid grid-cols-subgrid hover:bg-slate-400`}
    >
      <b>{name ?? "null"}</b>
      <p>{stringDate}</p>
      <p>{length} days</p>
      <i>{code}</i>
    </Link>
  );
}

type SortBtnProps = {
  sort: (param: string) => void;
};

function SortBtn({ sort }: SortBtnProps) {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div
      className={`relative hover:cursor-pointer p-1 rounded-md ${
        displayMenu ? "bg-white" : "bg-transparent"
      }`}
      onClick={() => setDisplayMenu((prev) => !prev)}
    >
      <svg width="30" height="23" viewBox="0 0 23 23">
        <path d="M 2 5 L 23 5" stroke="black" strokeWidth={2} />
        <path d="M 2 11.5 L 18 11.5" stroke="black" strokeWidth={2} />
        <path d="M 2 18 L 13 18" stroke="black" strokeWidth={2} />
      </svg>
      <div
        className={`top-0 -right-24 bg-white rounded-md ${
          displayMenu ? "absolute" : "hidden"
        }`}
      >
        <b className={`px-4 py-1`}>Sort By:</b>
        <ul>
          <li
            onClick={() => sort("name")}
            className={`px-4 py-1 hover:bg-slate-200`}
          >
            Name
          </li>
          <li
            onClick={() => sort("date")}
            className={`px-4 py-1 hover:bg-slate-200`}
          >
            Date
          </li>
          <li
            onClick={() => sort("length")}
            className={`px-4 py-1 hover:bg-slate-200 rounded-b-md`}
          >
            Length
          </li>
        </ul>
      </div>
    </div>
  );
}
