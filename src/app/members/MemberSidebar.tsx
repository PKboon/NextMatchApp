"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Member } from "@/generated/prisma";
import { calculateAge, transformImageUrl } from "@/lib/util";

type Props = {
	member: Member;
	navLinks: { name: string; href: string }[];
};

const MemberSidebar = ({ member, navLinks }: Props) => {
	const pathname = usePathname();

	return (
		<Card className="w-full mt-10 items-center h-[80vh]">
			<div className="pb-5">
				<Image
					height={200}
					width={200}
					src={transformImageUrl(member.image) || "/image/user.png"}
					alt="User profile main page"
					className="rounded-full mt-6 aspect-square object-cover"
				/>
			</div>

			<CardBody>
				<div className="flex flex-col items-center">
					<div className="text-2xl">
						{member.name}, {calculateAge(member.dateOfBirth)}
					</div>
					<div className="text-sm text-neutral-500">
						{member.city}, {member.country}
					</div>
				</div>
				<Divider className="my-3" />
				<nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
					{navLinks.map((link) => (
						<Link
							href={link.href}
							key={link.name}
							className={`block rounded ${
								pathname === link.href
									? "text-secondary"
									: "hover:text-secondary/50"
							}`}
						>
							{link.name}
						</Link>
					))}
				</nav>
			</CardBody>
			<CardFooter>
				<Button
					as={Link}
					href="/members"
					fullWidth
					color="secondary"
					variant="bordered"
				>
					Go back
				</Button>
			</CardFooter>
		</Card>
	);
};
export default MemberSidebar;
