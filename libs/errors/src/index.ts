import { ZodIssue } from "zod";
import createError from "http-errors";
import { parseZodError } from "@shorter/validators";

export const createValidationError = (zodErrors: ZodIssue[]) => {
	return createError(400, "Error while validating data", {
		zod: parseZodError(zodErrors),
	});
};

export const createError404 = (message: string) => {
	return createError(404, message);
};

export const createError403 = (message: string) => {
	return createError(403, message);
};

export const createError401 = (message: string) => {
	return createError(401, message);
};

export const createError400 = (message: string) => {
	return createError(400, message);
};
