import * as z from "zod";

export const User = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN", "COACH"]).optional(),
  updatedAt: z.iso.datetime().optional(),
  createdAt: z.iso.datetime().optional(),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});
