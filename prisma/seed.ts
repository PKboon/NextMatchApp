import { hash } from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma";
import { membersData } from "./membersData";

const prisma = new PrismaClient();

const seedMember = async () => {
	return membersData.map(async (member) => {
		return prisma.user.create({
			data: {
				email: member.email,
				name: member.name,
				image: member.image,
				emailVerified: new Date(),
				passwordHash: await hash("password", 10),
				profileComplete: true,
				member: {
					create: {
						name: member.name,
						gender: member.gender,
						description: member.description,
						city: member.city,
						country: member.country,
						image: member.image,
						dateOfBirth: new Date(member.dateOfBirth),
						created: new Date(member.created),
						updated: new Date(member.lastActive),
						photos: {
							create: {
								url: member.image,
							},
						},
					},
				},
			},
		});
	});
};

async function seedAdmin() {
	return prisma.user.create({
		data: {
			email: "admin@test.com",
			emailVerified: new Date(),
			name: "Admin",
			passwordHash: await hash("password", 10),
			role: "ADMIN",
		},
	});
}

const main = async () => {
	await seedMember();
	await seedAdmin();
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
