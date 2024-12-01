import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export const surveySchema = z.object({
  code: z.string().min(5, { message: "Please enter valid survey code" }).trim(),
  name: z.string().min(1, { message: "Enter party name" }).trim(),
  date: z.date(),
  length: z.string().min(1, { message: "Enter length of stay" }).trim(),
  diet: z.string().trim(),
  other: z.string().trim(),
  beverage: z.string().trim(),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .trim(),
  id: z.string().trim(),
});
