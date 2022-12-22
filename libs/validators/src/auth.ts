import { z } from "zod"

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	rememberme: z.boolean(),
	enabledCookie: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>
