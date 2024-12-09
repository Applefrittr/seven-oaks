"use client";

import { login } from "@/server/actions";
import FormElement from "./FormElement";
import { useState } from "react";

type Errors = {
  username?: string[] | undefined;
  password?: string[] | undefined;
};

export default function LoginForm() {
  const [errors, setErrors] = useState<Errors | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginState = await login(formData);

    if (loginState?.errors) {
      setErrors(loginState.errors);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`m-4 p-6 rounded-2xl bg-black text-white flex flex-col gap-6`}
    >
      <legend className={`text-center text-2xl`}>Admin Portal</legend>
      <FormElement>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          className="text-black rounded p-1"
        />
      </FormElement>
      {errors?.username && <p className="text-red-600">{errors.username}</p>}
      <FormElement>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="text-black rounded p-1"
        />
      </FormElement>
      {errors?.password && <p className="text-red-600">{errors.password}</p>}
      <button
        type="submit"
        className={`px-4 py-1 rounded-md bg-slate-500 w-max`}
      >
        Sign In
      </button>
    </form>
  );
}
