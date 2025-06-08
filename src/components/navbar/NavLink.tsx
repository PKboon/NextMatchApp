"use client";

import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useMessageStore from "@/hooks/useMessageStore";

type Props = {
	href: string;
	label: string;
};

const NavLink = ({ href, label }: Props) => {
	const pathname = usePathname();
	const unreadCount = useMessageStore((state) => state.unreadCount);

	return (
		<NavbarItem isActive={href === pathname} as={Link} href={href}>
			<span>{label}</span>
			{href === "/messages" && <span className="ml-1">({unreadCount})</span>}
		</NavbarItem>
	);
};
export default NavLink;
