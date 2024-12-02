import { getSession } from "@/server/session";
import UpdateUsername from "./UpdateUsername";
import UpdatePassword from "./UpdatePassword";

export default async function Settings() {
  const session = await getSession();
  const userID = session?.userId as string;

  return (
    <section className={`flex-auto flex flex-col gap-6 w-max`}>
      <h1 className="font-extrabold text-xl">Settings</h1>
      <div className={`bg-white p-8 rounded-lg flex flex-col gap-6`}>
        <UpdateUsername userID={userID} />
        <UpdatePassword userID={userID} />
      </div>
    </section>
  );
}
