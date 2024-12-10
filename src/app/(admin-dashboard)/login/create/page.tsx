"use client";

import { newUser } from "@/server/actions";

export default function CreateUserForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await newUser(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Create User</legend>
      <label htmlFor="username">username</label>
      <input id="username" name="username" />
      <label htmlFor="password">password</label>
      <input id="password" name="password" />
      <button type="submit" className={`p-4 bg-slate-500 text-white`}>
        Submit
      </button>
    </form>
  );
}
