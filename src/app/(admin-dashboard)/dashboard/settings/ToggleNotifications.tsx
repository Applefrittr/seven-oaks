"use client";

import { toggleNotifications } from "@/server/actions";
import { useState } from "react";

type ToggleNotificationsProps = {
  emailNotifications: boolean | undefined | null;
  userID: string | undefined;
};

export default function ToggleNotifications({
  emailNotifications,
  userID,
}: ToggleNotificationsProps) {
  const [email, setEmail] = useState(emailNotifications);

  const emailToggle = async () => {
    await toggleNotifications(userID, "email");
    setEmail((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-4`}>
      <b>Notifications</b>
      <div className={`flex justify-between`}>
        Email:
        <div
          className={`w-16 bg-slate-200 h-8 rounded-md hover:cursor-pointer`}
          onClick={emailToggle}
        >
          <div
            className={`w-1/2 h-full rounded-md transition-all border ${
              email
                ? "bg-green-300 border-green-500 translate-x-full"
                : "bg-red-300 border-red-500 translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
