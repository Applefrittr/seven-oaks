import { returnSession } from "@/server/actions";

export default async function Dashboard() {
  const session = await returnSession();
  return (
    <section className={`flex-auto min-h-full bg-white`}>
      <div>Dashboard</div>
      <p>{JSON.stringify(session, null, 2)}</p>
    </section>
  );
}
