import { z } from "zod";

export const loginSchema = z.object({
	password: z.string(),
});
// TODO: Add values for registerSchema
export const registerSchema = z.object({});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
