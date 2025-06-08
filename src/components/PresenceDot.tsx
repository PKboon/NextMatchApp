"use client";

import { GoDot, GoDotFill } from "react-icons/go";

import { Member } from "@/generated/prisma";
import usePresenceStore from "@/hooks/usePresenceStore";

type Props = {
	member: Member;
};

const PresenceDot = ({ member }: Props) => {
	const members = usePresenceStore((state) => state.members);

	const isOnline = members.indexOf(member.userId) !== -1;

	if (!isOnline) return null;

	return (
		<>
			<GoDot
				size={36}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<GoDotFill size={32} className="fill-green-500 animate-pulse" />
		</>
	);
};
export default PresenceDot;
