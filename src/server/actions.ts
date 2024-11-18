"use server";

import { getUser } from "@/db/queries";
import { createSession, deleteSession, getSession } from "@/server/session";
import { getCodes, createNewCode } from "@/db/queries";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

export async function login(formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { username, password } = result.data;

  const results = await getUser(username);

  if (results.length === 0 || password !== results[0].password) {
    return {
      errors: { username: ["Invalid username or password"] },
    };
  }

  await createSession(results[0].id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();

  redirect("/login");
}

export async function displayCodes() {
  return await getCodes();
}

export async function createCode() {
  await createNewCode();
  console.log("code created!");
  revalidatePath("/dashboard/codes");
}
