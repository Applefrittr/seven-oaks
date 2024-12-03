import { getSession } from "@/server/session";
import UpdateUsername from "./UpdateUsername";
import UpdatePassword from "./UpdatePassword";
import { getUserbyId } from "@/db/queries";
import UpdateEmail from "./UpdateEmail";
import ToggleNotifications from "./ToggleNotifications";

export default async function Settings() {
  const session = await getSession();
  const userID = session?.userId as string;
  const user = await getUserbyId(userID);

  return (
    <section className={`flex-auto flex flex-col gap-6 w-max`}>
      <h1 className="font-extrabold text-xl">Settings</h1>
      <b>
        Current User: <i>{user?.username}</i>
      </b>
      <div className={`flex gap-4 flex-wrap`}>
        <div className={`bg-white p-8 rounded-lg flex flex-col gap-6 min-w-80`}>
          <UpdateUsername userID={user?.id} />
          <UpdatePassword userID={user?.id} />
        </div>
        <div className={`bg-white p-8 rounded-lg flex flex-col gap-6 min-w-80`}>
          <b>Contact Info</b>
          <UpdateEmail email={user?.email} userID={user?.id} />
          <ToggleNotifications
            emailNotifications={user?.email_notifications}
            userID={user?.id}
          />
        </div>
      </div>
    </section>
  );
}
