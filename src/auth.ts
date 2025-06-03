import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";

const prisma = new PrismaClient();

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});
