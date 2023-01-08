import { z } from "zod"
import isStrongPassword from "validator/lib/isStrongPassword"
import isSlug from "validator/lib/isSlug"

// Schemas
export const createUserDefaultSchema = z.object({
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
export const createUserSchema = createUserDefaultSchema.superRefine(
	({ password, password2 }, ctx) => {
		if (password !== password2) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords did not match!",
				path: ["password2"],
			})
		}
	}
)
export const updateUserEmailDefaultSchema = z.object({
	currentEmail: z
		.string()
		.min(1, "Cannot be empty.")
		.max(254, "Email characters are limited to 254.")
		.email("Email not valid."),
	newEmail: z
		.string()
		.min(1, "Cannot be empty.")
		.max(254, "Email characters are limited to 254.")
		.email("Email not valid."),
})
export const updateUserEmailSchema = updateUserEmailDefaultSchema.superRefine(
	({ currentEmail, newEmail }, ctx) => {
		if (currentEmail === newEmail) {
			ctx.addIssue({
				code: "custom",
				message: "Cannot be the same email.",
				path: ["newEmail"],
			})
		}
	}
)
export const updateUserPasswordDefaultSchema = z.object({
	currentPassword: z
		.string()
		.min(8, "Minimum 8 characters.")
		.max(60, "Maximum 60 characters.")
		.refine(
			isStrongPassword,
			"Must have minimum 8 characters, 1 uppercase, 1 number and 1 symbol."
		),
	newPassword: z
		.string()
		.min(8, "Minimum 8 characters.")
		.max(60, "Maximum 60 characters.")
		.refine(
			isStrongPassword,
			"Must have minimum 8 characters, 1 uppercase, 1 number and 1 symbol."
		),
})
export const updateUserPasswordSchema =
	updateUserPasswordDefaultSchema.superRefine(
		({ currentPassword, newPassword }, ctx) => {
			if (currentPassword === newPassword) {
				ctx.addIssue({
					code: "custom",
					message: "Cannot be the same password.",
					path: ["newPassword"],
				})
			}
		}
	)
export const updateUserUrlNameSchema = z.object({
	urlName: z
		.string()
		.min(0)
		.max(20)
		.regex(
			/^[a-z0-9-]+$/,
			"Only lowercase letters, numbers and hyphens are allowed"
		)
		.refine(isSlug, "Can only have a single hyphen between string"),
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
export const checkEmailSchema = z.object({
	email: z.string().email(),
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
export type CheckEmailSchema = z.infer<typeof checkEmailSchema>
