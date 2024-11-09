"use client";

import SubmitButton from "./SubmitButton";

export default function CreateUserForm() {
  return (
    <form>
      <legend>Create User</legend>
      <label htmlFor="create-username">username</label>
      <input id="create-username" name="create-username" />
      <label htmlFor="create-password">password</label>
      <input id="create-password" name="create-password" />
      <label htmlFor="confirm-password">confirm password</label>
      <input id="confirm-password" name="confirm-password" />
      <label htmlFor="email">email</label>
      <input type="email" id="email" name="email" />
      <SubmitButton text={"create"} />
    </form>
  );
}
