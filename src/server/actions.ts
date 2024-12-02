"use server";

import {
  deleteSurvey,
  getAllSurveys,
  getPastSurveys,
  getUpcomingSurveys,
  getUser,
  updateUsername,
  updatePassword,
  createNewCode,
  createSurvey,
  getUserbyId,
} from "@/db/queries";
import { createSession, deleteSession } from "@/server/session";
import { redirect } from "next/navigation";
import {
  loginSchema,
  surveySchema,
  usernameSchema,
  passwordSchema,
} from "./dataSchemas";
import { revalidatePath } from "next/cache";
import { SurveyData } from "@/db/dataTypes";

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

export async function changeUsername(formData: FormData) {
  const result = usernameSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { username, id } = result.data;

  await updateUsername(id, username);

  return {
    success: { username: ["Username successfully updated"] },
  };
}

export async function changePassword(formData: FormData) {
  const result = passwordSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { oldPass, newPass, confirmPass, id } = result.data;

  const results = await getUserbyId(id);

  if (results && oldPass !== results[0].password) {
    return {
      errors: { oldPass: ["Incorrect password"] },
    };
  }

  if (newPass !== confirmPass) {
    return {
      errors: { newPass: ["New password and confirm did not match"] },
    };
  }

  await updatePassword(id, newPass);

  return {
    success: { password: ["Password successfully updated"] },
  };
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
  param = "name",
  view = "Upcoming"
): Promise<SurveyData[] | undefined> {
  if (view === "Upcoming") return await getUpcomingSurveys(param);
  else if (view === "Past") return await getPastSurveys(param);
  else return getAllSurveys(param);
}

export async function removeSurvey(code: string) {
  console.log(code, " to be deleted");
  await deleteSurvey(code);
  redirect("/dashboard/surveys");
}
