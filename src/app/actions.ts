"use server";

import { createSession, deleteSession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const testUser = {
  id: "1",
  username: "apple",
  password: "12345678",
};

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function returnSession() {
  return await getSession();
}

type actionState = {
  errors: {
    username?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export async function login(
  prevState: actionState | undefined,
  formData: FormData
) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;
  if (username !== testUser.username || password !== testUser.password) {
    return {
      errors: { username: ["Invalid username or password"] },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();

  redirect("/login");
}
