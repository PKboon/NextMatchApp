import { z } from "zod";

import { calculateAge } from "../util";

export const registerSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});

export const profileSchema = z.object({
	gender: z.string().min(1, {
		message: "Gender is required",
	}),
	description: z.string().min(1, {
		message: "Description is required",
	}),
	city: z.string().min(1, {
		message: "City is required",
	}),
	country: z.string().min(1, {
		message: "Country is required",
	}),
	dateOfBirth: z
		.string()
		.min(1, {
			message: "Date of birth is required",
		})
		.refine(
			(dateString) => {
				const age = calculateAge(new Date(dateString));
				return age >= 18;
			},
			{
				message: "You must be at least 18 to use this app",
			}
		),
});

export const combinedRegisterSchema = registerSchema.merge(profileSchema);

export type RegisterSchema = z.infer<typeof registerSchema>;

export type ProfileSchema = z.infer<typeof profileSchema>;
