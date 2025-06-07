import { z } from "zod";

export const messageSchema = z.object({
	text: z.string().min(1, {
		message: "",
	}),
});

export type MessageSchema = z.infer<typeof messageSchema>;
