import isURL from "validator/lib/isURL"
import { z } from "zod"

export const createUrlSchema = z.object({
	useUrlName: z.boolean(),
	to: z.string().refine(
		(url) =>
			isURL(url, {
				allow_fragments: false,
				require_protocol: true,
			}),
		"Invalid URL, please check your url, fragments are not allowed and protocol is required"
	),
	ephemeral: z.boolean(),
	custom: z
		.string()
		.min(5, "Must be contain at least 5 characters")
		.max(60, "Can contain up to 60 characters")
		.optional(),
	duration: z
		.number()
		.int()
		.positive("Duration must be a positive integer")
		.min(1, "Minimum duration is 1 hour")
		.max(1440, "Maximum duration is 60 days (1440 hours)")
		.optional()
		.default(24),
})

export const deleteUrlSchema = z.object({
	urlUuid: z.string().uuid(),
})

export const updateUrlSchema = z.object({
	urlUuid: z.string().uuid(),
	to: z.string().refine(
		(url) =>
			isURL(url, {
				allow_fragments: false,
			}),
		"Invalid URL, please check your url, fragments are not allowed"
	),
	ephemeral: z.boolean(),
	duration: z
		.number()
		.int()
		.positive("Duration must be a positive integer")
		.min(3600, "Minimum duration is 1 hour")
		.max(5184000, "Maximum duration is 60 days")
		.optional()
		.default(86400),
})

export const getUrlSchema = z.object({
	urlUuid: z.string().uuid(),
})

export const updateUrlActiveStatusSchema = z.object({
	urlUuid: z.string().uuid(),
	active: z.boolean(),
})

export const checkCustomUrlSchema = z.object({
	customUrl: z
		.string()
		.min(5, "Must be contain at least 5 characters")
		.max(60, "Can contain up to 60 characters"),
})

export type CreateUrlSchema = z.infer<typeof createUrlSchema>
export type DeleteUrlSchema = z.infer<typeof deleteUrlSchema>
export type UpdateUrlSchema = z.infer<typeof updateUrlSchema>
export type GetUrlSchema = z.infer<typeof getUrlSchema>
export type UpdateUrlActiveStatusSchema = z.infer<
	typeof updateUrlActiveStatusSchema
>
export type CheckCustomUrlSchema = z.infer<typeof checkCustomUrlSchema>
