import * as z from "zod";

export const User = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN", "COACH"]).optional(),
  updatedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional(),
});
