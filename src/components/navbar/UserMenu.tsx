"use client";

import { Avatar } from "@heroui/avatar";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@heroui/dropdown";
import Link from "next/link";

import { signOutUser } from "@/app/actions/authActions";

type Props = {
	userInfo: { name: string | null; image: string | null } | null;
};

const UserMenu = ({ userInfo }: Props) => {
	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform"
					color="secondary"
					name={userInfo?.name || "user avatar"}
					size="sm"
					src={userInfo?.image || "/images/user.png"}
				/>
			</DropdownTrigger>
			<DropdownMenu variant="flat" aria-label="User actions menu">
				<DropdownSection showDivider>
					<DropdownItem
						isReadOnly
						as="span"
						className="h-14 flex flex-row cursor-default"
						aria-label="username"
						key="username"
					>
						Signed in as {userInfo?.name}
					</DropdownItem>
				</DropdownSection>
				<DropdownItem as={Link} href="/members/edit" key="edit profile">
					Edit profile
				</DropdownItem>
				<DropdownItem
					color="danger"
					onPress={async () => signOutUser()}
					key="sign out"
				>
					Sign out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserMenu;
