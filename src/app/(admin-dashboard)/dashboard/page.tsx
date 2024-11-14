import { returnSession } from "@/server/actions";

export default async function Dashboard() {
  const session = await returnSession();
  console.log(session);
  return (
    <section
      className={`flex-auto min-h-full bg-white flex flex-col gap-6 p-8`}
    >
      <h1>Dashboard</h1>
      {/* <p>{JSON.stringify(session, null, 2)}</p> */}
      <DashboardContainer>
        <p>Container 2</p>
        <div>
          <p>content 2</p>
        </div>
      </DashboardContainer>
    </section>
  );
}

function DashboardContainer({ children }: { children: React.ReactNode }) {
  return <div className={`flex-auto bg-slate-400`}>{children}</div>;
}
