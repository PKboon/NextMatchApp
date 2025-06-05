import { hash } from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma";
import { membersData } from "./membersData";

const prisma = new PrismaClient();

const seedMember = async () => {
	return membersData.map(async (member) => {
		const {
			email,
			name,
			gender,
			image,
			description,
			city,
			country,
			dateOfBirth,
			created,
			lastActive,
		} = member;

		return prisma.user.create({
			data: {
				email,
				name,
				image,
				emailVerified: new Date(),
				passwordHash: await hash("password", 10),
				member: {
					create: {
						name,
						gender,
						description,
						city,
						country,
						image,
						dateOfBirth: new Date(dateOfBirth),
						created: new Date(created),
						updated: new Date(lastActive),
						photos: {
							create: {
								url: image,
							},
						},
					},
				},
			},
		});
	});
};

const main = async () => {
	await seedMember();
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
