"use server";

import {
  deleteSurvey,
  getAllSurveys,
  getPastSurveys,
  getUpcomingSurveys,
  getUserPass,
  updateUsername,
  updatePassword,
  updateEmail,
  updateNotifications,
  createNewCode,
  createSurvey,
  getUserbyId,
  getAdminNotifications,
  createUser,
} from "@/db/queries";
import { createSession, deleteSession } from "@/server/session";
import { redirect } from "next/navigation";
import {
  loginSchema,
  surveySchema,
  usernameSchema,
  passwordSchema,
  emailSchema,
  emailONLYSchema,
} from "./dataSchemas";
import { revalidatePath } from "next/cache";
import { SurveyData, User } from "@/db/dataTypes";
import {
  confirmationEmail,
  newSurveyEmail,
} from "@/emails/nodeMailerFunctions";
import { hash, compare } from "bcryptjs";

export async function login(formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { username, password } = result.data;

  const user = await getUserPass(username);

  if (!user) return { errors: { username: ["Invalid username or password"] } };
  else {
    const result = await compare(password, user.password);

    if (!result)
      return {
        errors: { username: ["Invalid username or password"] },
      };
    await createSession(user.id);

    redirect("/dashboard");
  }
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

  revalidatePath("/dashboard/settings");

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

  const user = await getUserbyId(id);

  if (user && oldPass !== user.password) {
    return {
      errors: { oldPass: ["Incorrect password"] },
    };
  }

  if (newPass !== confirmPass) {
    return {
      errors: { newPass: ["New password and confirm did not match"] },
    };
  }

  hash(newPass, 10, async (err, hashedPass) => {
    if (err) throw new Error("Password hash operation failed");
    else await updatePassword(id, hashedPass);
  });

  return {
    success: { password: ["Password successfully updated"] },
  };
}

export async function changeEmail(formData: FormData) {
  const result = emailSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, id } = result.data;

  await updateEmail(id, email);

  return {
    success: { email: ["Email successfully updated"] },
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

  if (queryResult?.length === 0) {
    return {
      errors: { code: ["Survey code does not exits, please try again"] },
    };
  }

  const notifications = await getAdminNotifications();

  if (notifications?.email && notifications?.email_notifications) {
    newSurveyEmail(result.data.code, result.data.name, notifications.email);
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
  await deleteSurvey(code);
  redirect("/dashboard/surveys");
}

export async function toggleNotifications(
  id: string | undefined,
  notifications: "email" | "text"
) {
  let column;
  if (notifications === "email") column = "email_notifications";
  else column = "text_notifications";

  await updateNotifications(id, column);
}

export async function sendEmailConfirmation(
  surveyData: SurveyData,
  formData: FormData
) {
  const result = emailONLYSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { email } = result.data;

  await confirmationEmail(surveyData, email);
}

export async function newUser(formData: FormData) {
  const user = Object.fromEntries(formData) as unknown as User;

  hash(user.password, 10, async (err, hashedPass) => {
    if (err) throw new Error("Password hash operation failed");
    else {
      user.password = hashedPass;
      await createUser(user);
    }
  });

  redirect("/login");
}
