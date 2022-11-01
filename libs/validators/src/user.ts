import { z } from "zod";
import isStrongPassword from "validator/lib/isStrongPassword";

// Schemas
export const createUserSchema = z.object({
	email: z.string().max(254).email(),
	pseudo: z.string().min(3).max(255),
	password: z.string().min(8).max(60).refine(isStrongPassword),
	vip: z.boolean(),
	urlName: z.optional(
		z
			.string()
			.min(0)
			.max(20)
			.regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers are allowed")
	),
});
export const updateUserEmailSchema = z.object({
	uuid: z.string().uuid(),
	currentEmail: z.string().max(254).email(),
	newEmail: z.string().max(254).email(),
});
export const updateUserPasswordSchema = z.object({
	uuid: z.string().uuid(),
	currentPassword: z.string().min(8).max(60).refine(isStrongPassword),
	newPassword: z.string().min(8).max(60).refine(isStrongPassword),
});
export const updateUserUrlNameSchema = z.object({
	uuid: z.string().uuid(),
	urlName: z
		.string()
		.min(0)
		.max(20)
		.regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers are allowed"),
});
export const updateUserVIP = z.object({
	uuid: z.string().uuid(),
	vip: z.boolean(),
});
export const updateUserPseudo = z.object({
	uuid: z.string().uuid(),
	pseudo: z.string().min(3).max(255),
});
export const deleteUserSchema = z.object({
	uuid: z.string().uuid(),
	password: z.string(),
});
export const getUserSchema = z.object({
	uuid: z.string().uuid(),
});

// Types
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserEmailSchema = z.infer<typeof updateUserEmailSchema>;
export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
export type UpdateUserUrlNameSchema = z.infer<typeof updateUserUrlNameSchema>;
export type UpdateUserVIP = z.infer<typeof updateUserVIP>;
export type UpdateUserPseudo = z.infer<typeof updateUserPseudo>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type GetUserSchema = z.infer<typeof getUserSchema>;
