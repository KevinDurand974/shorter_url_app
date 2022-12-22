import { z } from "zod"
import isStrongPassword from "validator/lib/isStrongPassword"

// Schemas
export const createUserSchema = z
	.object({
		email: z.string().max(254).email(),
		password: z
			.string()
			.min(8)
			.max(60)
			.refine(
				isStrongPassword,
				"Must contain 1 upper case character, 1 lower case character and 1 symbol."
			),
		password2: z
			.string()
			.min(8)
			.max(60)
			.refine(
				isStrongPassword,
				"Must contain 1 upper case character, 1 lower case character and 1 symbol."
			),
		pseudo: z.string().min(3).max(20),
		urlname: z
			.string()
			.min(3)
			.max(20)
			.regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers are allowed"),
	})
	.superRefine(({ password, password2 }, ctx) => {
		if (password !== password2) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords did not match!",
				path: ["password2"],
			})
		}
	})
export const updateUserEmailSchema = z.object({
	currentEmail: z.string().max(254).email(),
	newEmail: z.string().max(254).email(),
})
export const updateUserPasswordSchema = z.object({
	currentPassword: z.string().min(8).max(60).refine(isStrongPassword),
	newPassword: z.string().min(8).max(60).refine(isStrongPassword),
})
export const updateUserUrlNameSchema = z.object({
	urlName: z
		.string()
		.min(0)
		.max(20)
		.regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers are allowed"),
})
export const updateUserVIPSchema = z.object({
	vip: z.boolean(),
})
export const updateUserPseudoSchema = z.object({
	pseudo: z.string().min(3).max(255),
})
export const deleteUserSchema = z.object({
	password: z.string(),
})
export const getUserSchema = z.object({
	uuid: z.string().uuid(),
})

// Types
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserEmailSchema = z.infer<typeof updateUserEmailSchema>
export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>
export type UpdateUserUrlNameSchema = z.infer<typeof updateUserUrlNameSchema>
export type UpdateUserVIPSchema = z.infer<typeof updateUserVIPSchema>
export type UpdateUserPseudoSchema = z.infer<typeof updateUserPseudoSchema>
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>
export type GetUserSchema = z.infer<typeof getUserSchema>
