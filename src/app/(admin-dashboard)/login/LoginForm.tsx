"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { login } from "@/app/actions";

export default function LoginForm() {
  const [loginState, loginAction] = useActionState(login, undefined);
  return (
    <form action={loginAction}>
      <legend>Sign In</legend>
      <label htmlFor="username">username</label>
      <input id="username" name="username" />
      {loginState?.errors?.username && (
        <p className="text-red-600">{loginState.errors.username}</p>
      )}
      <label htmlFor="password">password</label>
      <input id="password" name="password" />
      {loginState?.errors?.password && (
        <p className="text-red-600">{loginState.errors.password}</p>
      )}

      <SubmitButton text={"log in"} />
    </form>
  );
}
