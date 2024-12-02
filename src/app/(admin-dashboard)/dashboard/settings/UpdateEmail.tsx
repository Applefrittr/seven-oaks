"use client";
import DashboardButton from "@/app/components/DashboardButton";
import { changeEmail } from "@/server/actions";
import { useState } from "react";

type UpdateEmailProps = {
  email: string | undefined | null;
  userID: string | undefined;
};

type Errors = {
  email?: string[] | undefined;
};

type Success = {
  email?: string[] | undefined;
};

export default function UpdateEmail({ email, userID }: UpdateEmailProps) {
  const [errors, setErrors] = useState<Errors | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updateState = await changeEmail(formData);

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
      <label htmlFor="email">
        <i>Update Email</i>
      </label>
      <input
        id="email"
        name="email"
        className={`bg-slate-100 p-1 rounded-md`}
        placeholder={email ?? `abc@123.com`}
      />
      <input name="id" value={userID} hidden readOnly />
      <DashboardButton>Update Email</DashboardButton>
      {errors?.email && <p className="text-red-600">{errors.email}</p>}
      {success?.email && <p className="text-green-600">{success.email}</p>}
    </form>
  );
}
