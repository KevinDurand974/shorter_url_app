import { z } from "zod";
import isStrongPassword from "validator/lib/isStrongPassword";

// Types
export type ValidateNewUserSchema = z.infer<typeof validateNewUserSchema>;
export type ValidateNewUserEmailSchema = z.infer<
	typeof validateNewUserEmailSchema
>;
export type ValidateNewUserPasswordSchema = z.infer<
	typeof validateNewUserPasswordSchema
>;
export type ValidateNewUserUrlNameSchema = z.infer<
	typeof validateNewUserUrlNameSchema
>;
export type ValidateUserUrlActiveSchema = z.infer<
	typeof validateUserUrlActiveSchema
>;
export type ValidateUserVipSchema = z.infer<typeof validateUserVipSchema>;
export type ValidateUserPseudoSchema = z.infer<typeof validateUserPseudoSchema>;
export type ValidateUserDeletingSchema = z.infer<
	typeof validateUserDeletingSchema
>;
export type ValidateUserGetSchema = z.infer<typeof validateUserGetSchema>;

// Schemas
const validateNewUserSchema = z.object({
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
const validateNewUserEmailSchema = z.object({
	uuid: z.string().uuid(),
	currentEmail: z.string().max(254).email(),
	newEmail: z.string().max(254).email(),
});
const validateNewUserPasswordSchema = z.object({
	uuid: z.string().uuid(),
	currentPassword: z.string().min(8).max(60).refine(isStrongPassword),
	newPassword: z.string().min(8).max(60).refine(isStrongPassword),
});
const validateNewUserUrlNameSchema = z.object({
	uuid: z.string().uuid(),
	urlName: z
		.string()
		.min(0)
		.max(20)
		.regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers are allowed"),
});
const validateUserUrlActiveSchema = z.object({
	uuid: z.string().uuid(),
	password: z.string(),
	urlActive: z.boolean(),
});
const validateUserVipSchema = z.object({
	uuid: z.string().uuid(),
	vip: z.boolean(),
});
const validateUserPseudoSchema = z.object({
	uuid: z.string().uuid(),
	pseudo: z.string().min(3).max(255),
});
const validateUserDeletingSchema = z.object({
	uuid: z.string().uuid(),
	password: z.string(),
});
const validateUserGetSchema = z.object({
	uuid: z.string().uuid(),
});

// Functions
export const validateNewUser = async (data: ValidateNewUserSchema) =>
	validateNewUserSchema.spa(data);

export const validateNewUserEmail = async (data: ValidateNewUserEmailSchema) =>
	validateNewUserEmailSchema.spa(data);

export const validateNewUserPassword = async (
	data: ValidateNewUserPasswordSchema
) => validateNewUserPasswordSchema.spa(data);

export const validateNewUserUrlName = async (
	data: ValidateNewUserUrlNameSchema
) => validateNewUserUrlNameSchema.spa(data);

export const validateUserUrlActive = async (
	data: ValidateUserUrlActiveSchema
) => validateUserUrlActiveSchema.spa(data);

export const validateUserVip = async (data: ValidateUserVipSchema) =>
	validateUserVipSchema.spa(data);

export const validateUserPseudo = async (data: ValidateUserPseudoSchema) =>
	validateUserPseudoSchema.spa(data);

export const validateUserDeleting = async (data: ValidateUserDeletingSchema) =>
	validateUserDeletingSchema.spa(data);

export const validateUserGet = async (data: ValidateUserGetSchema) =>
	validateUserGetSchema.spa(data);
