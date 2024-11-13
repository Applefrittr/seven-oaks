"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { login } from "@/server/actions";
import FormElement from "./FormElement";

export default function LoginForm() {
  const [loginState, loginAction] = useActionState(login, undefined);
  return (
    <form
      action={loginAction}
      className={`p-6 rounded-2xl bg-black text-white flex flex-col gap-6`}
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
      {loginState?.errors?.username && (
        <p className="text-red-600">{loginState.errors.username}</p>
      )}
      <FormElement>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="text-black rounded p-1"
        />
      </FormElement>
      {loginState?.errors?.password && (
        <p className="text-red-600">{loginState.errors.password}</p>
      )}
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}
