import { z } from "zod";

export const getRedirectUrlSchema = z.object({
	path: z.string(),
});

export type GetRedirectUrlSchema = z.infer<typeof getRedirectUrlSchema>;
