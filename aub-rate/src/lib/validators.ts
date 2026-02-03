// Language: TypeScript
import { z } from "zod";

export const aubEmailSchema = z
  .string()
  .email("Please enter a valid email.")
  .refine((email) => email.toLowerCase().endsWith("@mail.aub.edu"), {
    message: "Only @mail.aub.edu emails are allowed.",
  });

export const registerSchema = z.object({
  email: aubEmailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password is too long."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
