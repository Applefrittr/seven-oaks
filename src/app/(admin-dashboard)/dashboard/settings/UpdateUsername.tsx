"use client";
import { changeUsername } from "@/server/actions";
import { useState } from "react";
import DashboardButton from "../../../components/DashboardButton";

type Errors = {
  username?: string[] | undefined;
};

type Success = {
  username?: string[] | undefined;
};

export default function UpdateUsername({
  userID,
}: {
  userID: string | undefined;
}) {
  const [errors, setErrors] = useState<Errors | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updateState = await changeUsername(formData);

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
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2`}>
      <label htmlFor="username">
        <b>Change Username</b>
      </label>
      <input
        id="username"
        name="username"
        className={`bg-slate-100 p-1 rounded-md`}
        placeholder="username..."
      />
      <input name="id" value={userID} hidden readOnly />
      <DashboardButton>Submit</DashboardButton>
      {errors?.username && <p className="text-red-600">{errors.username}</p>}
      {success?.username && (
        <p className="text-green-600">{success.username}</p>
      )}
    </form>
  );
}
