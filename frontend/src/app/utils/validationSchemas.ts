import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name is required").max(30, "Name is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&,.]/,
      "Password must contain at least one special character"
    ),
});

export const AddMetricSchema = z.object({
  weight: z.number("Weight is required").min(30, "Weight can't be that low"),
  bodyFat: z
    .number("Body Fat must be a number")
    .min(5, "Body Fat can't be that low")
    .optional(),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
