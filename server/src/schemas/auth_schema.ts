import * as z from 'zod'; 

export const registerBodySchema = z.object({
	email: z.string(),
	externalId: z.string(),
});

export const loginBodySchema = z.object({
	email: z.string(),
	password: z.string(),
});