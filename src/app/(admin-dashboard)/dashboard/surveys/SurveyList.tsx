"use client";

import { SurveyData } from "@/db/dataTypes";
import { useEffect, useState } from "react";
import { sortSurveys } from "@/server/actions";
import Link from "next/link";
import dateToString from "@/lib/dateToString";
import dateToday from "@/lib/dateToday";
import DashboardButton from "@/app/components/DashboardButton";

type SurveyListProps = {
  data: SurveyData[];
};

export default function SurveyList({ data }: SurveyListProps) {
  const [surveys, setSurveys] = useState<SurveyData[]>(data);
  const [view, setView] = useState<"Upcoming" | "Past" | "All">("Upcoming");

  async function sort(param = "date", view = "Upcoming") {
    const data = (await sortSurveys(param, view)) as SurveyData[];
    setSurveys(data);
  }

  const toggleView = () => {
    setView((prev) => {
      if (prev === "Upcoming") return "Past";
      else if (prev === "Past") return "All";
      else return "Upcoming";
    });
  };

  useEffect(() => {
    sort("date", view);
  }, [view]);

  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <div className="flex gap-4">
        <h1 className="font-extrabold text-xl">Surveys</h1>
        <SortBtn sort={sort} view={view} />
      </div>
      <div className={`flex gap-4 items-center`}>
        <b>Current View:</b>
        <form action={toggleView}>
          <DashboardButton>{view}</DashboardButton>
        </form>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 sm:grid-cols-[3fr_1fr_1fr_1fr]">
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
  const today = dateToday();
  const stringDate = dateToString(date);

  return (
    <Link
      href={`/dashboard/surveys/${code}`}
      className={`p-4 ${
        date < today
          ? "bg-red-200 hover:bg-red-400"
          : "bg-white hover:bg-slate-400"
      } rounded-md col-span-full grid grid-cols-subgrid
      }`}
    >
      <b>{name ?? "null"}</b>
      <p>{stringDate}</p>
      <p>{length} days</p>
      <i>{code}</i>
    </Link>
  );
}

type SortBtnProps = {
  view: string;
  sort: (param: string, view: string) => void;
};

function SortBtn({ sort, view }: SortBtnProps) {
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
            onClick={() => sort("name", view)}
            className={`px-4 py-1 hover:bg-slate-200`}
          >
            Name
          </li>
          <li
            onClick={() => sort("date", view)}
            className={`px-4 py-1 hover:bg-slate-200`}
          >
            Date
          </li>
          <li
            onClick={() => sort("length", view)}
            className={`px-4 py-1 hover:bg-slate-200 rounded-b-md`}
          >
            Length
          </li>
        </ul>
      </div>
    </div>
  );
}
