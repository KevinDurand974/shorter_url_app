import { z } from "zod";

export const loginSchema = z.object({
	password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
