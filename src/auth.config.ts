import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { getUserByEmail } from "./app/actions/authActions";
import { loginSchema } from "./lib/schemas/loginSchema";

export default {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			// allowDangerousEmailAccountLinking: true,
			// clientId: process.env.GITHUB_CLIENT_ID,
			// clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Credentials({
			name: "credentials",
			async authorize(creds) {
				const validated = loginSchema.safeParse(creds);

				if (validated.success) {
					const { email, password } = validated.data;
					const user = await getUserByEmail(email);

					if (!user || !(await compare(password, user.passwordHash as string)))
						return null;

					return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
