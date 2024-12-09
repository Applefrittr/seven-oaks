import Calendar from "./Calendar";
import { SurveyData } from "@/db/dataTypes";
import { getDashboardMetrics } from "@/db/queries";
import Link from "next/link";
import dateToString from "@/lib/dateToString";

export default async function Dashboard() {
  const metrics = await getDashboardMetrics();

  return (
    <section className={`flex-auto flex flex-col gap-6 min-h-full`}>
      <h1 className="font-extrabold text-xl">Dashboard</h1>
      {/* <div className="flex gap-6"> */}
      <div className="flex gap-6 flex-wrap justify-end">
        <DashboardContainer header={"Total Upcoming Reservations (30 days)"}>
          <DashboardData>
            <b>{metrics?.surveys30}</b>
          </DashboardData>
        </DashboardContainer>
        <DashboardContainer header={"Total Reservations"}>
          <DashboardData>
            <b>{metrics?.surveysTotal}</b>
          </DashboardData>
        </DashboardContainer>
        <DashboardContainer header={"Overall Beverage Peference"}>
          <DashboardData>
            <b>{metrics?.beveragePref}</b>
          </DashboardData>
        </DashboardContainer>
        <DashboardContainer header={"Current Reservation(s)"}>
          <CurrentSurveys currentSurveys={metrics?.currentSurveys} />
        </DashboardContainer>
        <DashboardContainer header={"Next Reservation"}>
          <DashboardData>
            {metrics?.nextSurvey && <NextSurvey {...metrics.nextSurvey} />}
            {!metrics?.nextSurvey && <b>NONE</b>}
          </DashboardData>
        </DashboardContainer>
      </div>
      {/* </div> */}
      <div className={`flex-auto gap-4 flex flex-wrap lg:flex-nowrap`}>
        <DashboardContainer customStyle={`max-w-max`}>
          <Calendar />
        </DashboardContainer>
        <DashboardContainer
          header={"Upcoming Reservations"}
          customStyle={`w-full`}
        >
          <UpcomingSurveys upcomingSurveys={metrics?.upcomingSurveys} />
        </DashboardContainer>
      </div>
    </section>
  );
}

type DashboardContainerProps = {
  header?: string;
  children: React.ReactNode;
  customStyle?: string;
};

function DashboardContainer({
  header,
  children,
  customStyle,
}: DashboardContainerProps) {
  return (
    <div
      className={`flex-auto bg-white rounded-lg flex flex-col justify-between gap-8 max-h-max p-4 sm:p-8 ${customStyle}`}
    >
      {header && (
        <h2>
          <i>{header}</i>
        </h2>
      )}
      {children}
    </div>
  );
}

function DashboardData({ children }: { children: React.ReactNode }) {
  return <div className={`text-3xl flex justify-end`}>{children}</div>;
}

type CurrentSurveyProps = {
  currentSurveys: SurveyData[] | undefined;
};

function CurrentSurveys({ currentSurveys }: CurrentSurveyProps) {
  return (
    <div className={`flex flex-col gap-2 items-end`}>
      {currentSurveys &&
        currentSurveys.length > 0 &&
        currentSurveys.map((survey) => {
          const today = new Date().setHours(0, 0, 0, 0);
          const leavingDate = new Date(survey.date);
          leavingDate.setDate(leavingDate.getDate() + Number(survey.length));

          const daysLeft =
            (leavingDate.getTime() - today) / (24 * 60 * 60 * 1000);

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

function NextSurvey({ code, name, date }: SurveyData) {
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

type UpcomingSurveyProps = {
  upcomingSurveys: SurveyData[] | undefined;
};

function UpcomingSurveys({ upcomingSurveys }: UpcomingSurveyProps) {
  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 sm:grid-cols-[3fr_1fr_1fr_1fr]">
        <div className={`col-span-full grid grid-cols-subgrid`}>
          <b>Party Name</b>
          <b>Arrival Date</b>
          <b className={`sm:block hidden`}>Length of Stay</b>
          <b>Survey Code</b>
        </div>
        {upcomingSurveys &&
          upcomingSurveys.length > 0 &&
          upcomingSurveys.map((survey) => {
            return (
              <Link
                key={survey.code}
                href={`/dashboard/surveys/${survey.code}`}
                className={`text-base p-4 bg-slate-200 rounded-md col-span-full grid grid-cols-subgrid hover:bg-slate-400`}
              >
                <b>{survey.name ?? "null"}</b>
                <p>{dateToString(survey.date)}</p>
                <p className={`sm:block hidden`}>{survey.length} days</p>
                <i>{survey.code}</i>
              </Link>
            );
          })}
        {upcomingSurveys && upcomingSurveys.length === 0 && <b>NONE</b>}
      </div>
    </section>
  );
}
