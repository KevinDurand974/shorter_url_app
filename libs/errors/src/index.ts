import { ZodIssue } from "zod"
import createError from "http-errors"
import { TRPCError } from "@trpc/server"
import { parseZodError } from "@shorter/validators"

export const createValidationError = (zodErrors: ZodIssue[]) => {
	return createError(400, "Error while validating data", {
		zod: parseZodError(zodErrors),
	})
}

export const createError404 = (message: string) => {
	return new TRPCError({
		code: "NOT_FOUND",
		message,
	})
}

export const createError403 = (message: string) => {
	return new TRPCError({
		code: "FORBIDDEN",
		message,
	})
}

export const createError401 = (message: string) => {
	return new TRPCError({
		code: "UNAUTHORIZED",
		message,
	})
}

export const createError400 = (message: string) => {
	return new TRPCError({
		code: "BAD_REQUEST",
		message,
	})
}

export const createBadTokenError = () => {
	return new TRPCError({
		code: "BAD_TOKEN" as any,
		message: "You need to be logged before continuing.",
	})
}

export const createEmailVerifiedError = () => {
	return new TRPCError({
		code: "EMAIL_VALIDATION" as any,
		message: "You have to validate your email before accessing it.",
	})
}
