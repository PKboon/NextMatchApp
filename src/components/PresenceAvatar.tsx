"use client";

import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/react";

import usePresenceStore from "@/hooks/usePresenceStore";

type Props = {
	userId?: string;
	src: string | null;
};

const PresenceAvatar = ({ userId, src }: Props) => {
	const members = usePresenceStore((state) => state.members);

	const isOnline = userId && members.indexOf(userId) !== -1;

	return (
		<div>
			<Badge content="" color="success" shape="circle" isInvisible={!isOnline}>
				<Avatar src={src || "/images/user.png"} alt="User avatar" />
			</Badge>
		</div>
	);
};
export default PresenceAvatar;
