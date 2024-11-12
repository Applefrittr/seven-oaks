import { returnSession, logout } from "@/server/actions";

export default async function Dashboard() {
  const session = await returnSession();
  return (
    <main>
      <div>Dashboard</div>
      <p>{JSON.stringify(session, null, 2)}</p>
      <Logout>
        <>Logout</>
      </Logout>
    </main>
  );
}

type LogoutProps = {
  children: React.ReactElement;
};

function Logout({ children }: LogoutProps) {
  return (
    <form action={logout}>
      <button type="submit">{children}</button>
    </form>
  );
}
