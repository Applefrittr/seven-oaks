import { returnSession } from "@/app/actions";

export default async function Dashboard() {
  const session = await returnSession();
  return (
    <main>
      <div>Dashboard</div>
      <p>{JSON.stringify(session, null, 2)}</p>
    </main>
  );
}
