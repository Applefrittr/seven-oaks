import { getSession } from "@/server/session";
import UpdateUsername from "./UpdateUsername";

export default async function Settings() {
  const session = await getSession();
  const userID = session?.userId as string;

  return (
    <section className={`flex-auto flex flex-col gap-6`}>
      <h1 className="font-extrabold text-xl">Settings</h1>
      <UpdateUsername userID={userID} />
    </section>
  );
}
