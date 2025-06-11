"use client";

import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Member } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

import PresenceDot from "@/components/PresenceDot";
import LikeButton from "@/components/ui/LikeButton";
import { calculateAge, transformImageUrl } from "@/lib/util";

import { toggleLikeMember } from "../actions/likeActions";

type Props = {
	member: Member;
	likeIds: string[];
};

const MemberCard = ({ member, likeIds }: Props) => {
	const [hasLiked, setHasLiked] = useState(likeIds.includes(member.userId));
	const [isLoading, setIsLoading] = useState(false);

	async function toggleLike() {
		setIsLoading(true);
		try {
			await toggleLikeMember(member.userId, hasLiked);
			setHasLiked(!hasLiked);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	const preventLinkAction = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
			<Image
				isZoomed
				alt={member.name}
				width={300}
				src={transformImageUrl(member.image) || "/images/user.png"}
				className="aspect-square object-cover"
			/>

			<div onClick={preventLinkAction}>
				<div className="absolute top-3 right-3 z-50">
					<LikeButton
						isLoading={isLoading}
						toggleLike={toggleLike}
						hasLiked={hasLiked}
					/>
				</div>
				<div className="absolute top-2 left-3 z-50">
					<PresenceDot member={member} />
				</div>
			</div>

			<CardFooter className="absolute flex justify-start bg-dark-gradient overflow-hidden bottom-0 z-10">
				<div className="flex flex-col text-white">
					<span className="font-semibold">
						{member.name}, {calculateAge(member.dateOfBirth)}
					</span>
					<span className="text-sm">{member.city}</span>
				</div>
			</CardFooter>
		</Card>
	);
};
export default MemberCard;
