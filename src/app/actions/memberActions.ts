"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMembers() {
	// Get the currently logged-in user id to filter the user out from the returned member list
	const session = await auth();
	if (!session?.user) return null;

	try {
		return prisma.member.findMany({
			where: {
				NOT: {
					userId: session.user.id,
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}
