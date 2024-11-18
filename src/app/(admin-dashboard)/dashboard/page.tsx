import { returnSession } from "@/server/actions";
import Calendar from "./Calendar";

export default async function Dashboard() {
  const session = await returnSession();
  console.log(session);
  return (
    <section className={`flex-auto flex flex-col gap-6 p-8`}>
      <h1 className="font-extrabold text-xl">Dashboard</h1>
      <div className="flex gap-6">
        <DashboardContainer>
          <Calendar />
        </DashboardContainer>
        <div className="flex gap-6 flex-wrap justify-end">
          <DashboardContainer header={"Total Upcoming Reservations (30 days)"}>
            <DashboardData>0</DashboardData>
          </DashboardContainer>
          <DashboardContainer header={"Total Reservations"}>
            <DashboardData>0</DashboardData>
          </DashboardContainer>
          <DashboardContainer header={"Overall Beverage Peference"}>
            <DashboardData>coffee</DashboardData>
          </DashboardContainer>
          <DashboardContainer header={"Current Reservation"}>
            <DashboardData>NONE</DashboardData>
          </DashboardContainer>
          <DashboardContainer header={"Next Reservation"}>
            <DashboardData>NONE</DashboardData>
          </DashboardContainer>
        </div>
      </div>
      <div className={`flex-auto`}>
        <DashboardContainer
          header={"Upcoming Reservations"}
          customStyle={`h-full`}
        >
          <DashboardData>NONE</DashboardData>
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
      className={`flex-auto bg-white rounded-lg flex flex-col justify-between gap-8 max-h-max minmax p-8 ${customStyle}`}
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
  return <b className="text-right text-3xl">{children}</b>;
}
