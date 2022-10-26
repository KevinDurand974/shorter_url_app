import isURL from "validator/lib/isURL";
import { z } from "zod";

// Types
export type CreateShortUrlSchema = z.infer<typeof createShortUrlSchema>;
export type DeleteShortUrlSchema = z.infer<typeof deleteShortUrl>;
export type GetShortUrlSchema = z.infer<typeof getShortUrl>;

// Schemas
const createShortUrlSchema = z.object({
	uuid: z.string().uuid(),
	useUrlName: z.boolean(),
	to: z.string().refine(
		(url) =>
			isURL(url, {
				allow_fragments: false,
			}),
		"Invalid URL, please check your url, fragments are not allowed"
	),
	ephemeral: z.boolean(),
	custom: z.string().min(5).max(60).optional(),
	duration: z
		.number()
		.int()
		.positive("Duration must be a positive integer")
		.min(3600, "Minimum duration is 1 hour")
		.max(5184000, "Maximum duration is 60 days")
		.optional()
		.default(86400),
});
const deleteShortUrl = z.object({
	userUuid: z.string().uuid(),
	shortUrlUuid: z.string().uuid(),
});
const getShortUrl = z.object({
	url: z.string().min(5).max(60),
});

// Validators
export const validateCreateShortUrl = async (data: CreateShortUrlSchema) =>
	createShortUrlSchema.spa(data);
export const validateDeleteShortUrl = async (data: DeleteShortUrlSchema) =>
	deleteShortUrl.spa(data);
export const validateGetShortUrl = async (data: GetShortUrlSchema) =>
	getShortUrl.spa(data);
