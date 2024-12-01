"use client";
import { changeUsername } from "@/server/actions";
import { useState } from "react";

type Errors = {
  username?: string[] | undefined;
};

export default function UpdateUsername({ userID }: { userID: string }) {
  const [errors, setErrors] = useState<Errors | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ userID });
    const formData = new FormData(e.currentTarget);
    const updateState = await changeUsername(formData);

    if (updateState?.errors) {
      setErrors(updateState.errors);
    } else {
      setErrors(null);
    }
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        handleSubmit(event)
      }
    >
      <label htmlFor="username">New Username</label>
      <input id="username" name="username" />
      {errors?.username && <p className="text-red-600">{errors.username}</p>}
      <input name="id" value={userID} hidden readOnly />
      <button type="submit">Submit</button>
    </form>
  );
}
