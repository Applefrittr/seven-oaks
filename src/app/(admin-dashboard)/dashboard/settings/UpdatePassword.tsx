"use client";
import { changePassword } from "@/server/actions";
import { useState } from "react";
import DashboardButton from "../../../components/DashboardButton";

type Errors = {
  oldPass?: string[] | undefined;
  newPass?: string[] | undefined;
  confirmPass?: string[] | undefined;
};

type Success = {
  password?: string[] | undefined;
};

export default function UpdatePassword({
  userID,
}: {
  userID: string | undefined;
}) {
  const [errors, setErrors] = useState<Errors | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updateState = await changePassword(formData);

    if (updateState?.errors) {
      setErrors(updateState.errors);
    } else {
      setErrors(null);
    }

    if (updateState?.success) {
      setSuccess(updateState.success);
    } else {
      setSuccess(null);
    }
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        handleSubmit(event)
      }
      className={`flex flex-col gap-2`}
    >
      <legend>
        <b>Change Password</b>
      </legend>
      <div className={`flex flex-col gap-4`}>
        <label htmlFor="oldPass">
          <i>Old Password</i>
        </label>
        <input
          type="password"
          id="oldPass"
          name="oldPass"
          className={`bg-slate-100 p-1 rounded-md`}
          placeholder="password..."
        />
      </div>
      <div className={`flex flex-col gap-4`}>
        <label htmlFor="newPass">
          <i>New Password</i>
        </label>
        <input
          type="password"
          id="newPass"
          name="newPass"
          className={`bg-slate-100 p-1 rounded-md`}
          placeholder="password..."
        />
      </div>
      <div className={`flex flex-col gap-4`}>
        <label htmlFor="confirmPass">
          <i>Confirm New Password</i>
        </label>
        <input
          type="password"
          id="confirmPass"
          name="confirmPass"
          className={`bg-slate-100 p-1 rounded-md`}
          placeholder="password..."
        />
        <input name="id" value={userID} hidden readOnly />
      </div>
      <DashboardButton>Submit</DashboardButton>
      {errors?.newPass && <p className="text-red-600">{errors.newPass}</p>}
      {errors?.oldPass && <p className="text-red-600">{errors.oldPass}</p>}
      {success?.password && (
        <p className="text-green-600">{success.password}</p>
      )}
    </form>
  );
}
