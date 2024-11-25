"use server";

import { deleteSurvey, getAllSurveys, getUser } from "@/db/queries";
import { createSession, deleteSession } from "@/server/session";
import { createNewCode, createSurvey } from "@/db/queries";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { SurveyData } from "@/db/dataTypes";

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

const surveySchema = z.object({
  code: z.string().min(5, { message: "Please enter valid survey code" }).trim(),
  name: z.string().min(1, { message: "Enter party name" }).trim(),
  date: z.date(),
  length: z.string().min(1, { message: "Enter length of stay" }).trim(),
  diet: z.string().trim(),
  other: z.string().trim(),
  beverage: z.string().trim(),
});

export async function login(formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { username, password } = result.data;

  const results = await getUser(username);

  if (results?.length === 0 || (results && password !== results[0].password)) {
    return {
      errors: { username: ["Invalid username or password"] },
    };
  }

  await createSession(results && results[0].id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();

  redirect("/login");
}

export async function createCode() {
  await createNewCode();
  console.log("code created!");
  revalidatePath("/dashboard/codes");
}

export async function submitSurvey(formData: FormData) {
  const result = surveySchema.safeParse(Object.fromEntries(formData));
  console.log(formData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const queryResult = await createSurvey(result.data);

  console.log({ queryResult });

  if (queryResult?.length === 0) {
    return {
      errors: { code: ["Survey code does not exits, please try again"] },
    };
  }

  revalidatePath("/dashboard");
}

export async function sortSurveys(
  param = "name"
): Promise<SurveyData[] | undefined> {
  return await getAllSurveys(param);
}

export async function removeSurvey(code: string) {
  console.log(code, " to be deleted");
  await deleteSurvey(code);
  redirect("/dashboard/surveys");
}
