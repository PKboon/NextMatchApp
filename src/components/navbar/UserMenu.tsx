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
import { Session } from "next-auth";

import { signOutUser } from "@/app/actions/authActions";

type Props = {
	user: Session["user"];
};

const UserMenu = ({ user }: Props) => {
	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform"
					color="secondary"
					name={user?.name || "user avatar"}
					size="sm"
					src={user?.image || "/images/user.png"}
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
						Signed in as {user?.name}
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
