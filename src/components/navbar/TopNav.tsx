import { Button } from "@heroui/button";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import Link from "next/link";
import { GiMatchTip } from "react-icons/gi";

import { getUserNavInfo } from "@/app/actions/userActions";
import { auth } from "@/auth";

import FiltersWrapper from "./FiltersWrapper";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";

const memberLinks = [
	{ href: "/members", label: "Matches" },
	{ href: "/lists", label: "Lists" },
	{ href: "/messages", label: "Messages" },
];

const adminLinks = [{ href: "/admin/moderation", label: "Photo Moderation" }];

const TopNav = async () => {
	const session = await auth();
	const userInfo = session?.user && (await getUserNavInfo());

	const links = session?.user.role === "ADMIN" ? adminLinks : memberLinks;

	return (
		<>
			<Navbar
				maxWidth="xl"
				className="bg-gradient-to-r from-purple-400 to-purple-700"
				classNames={{
					item: [
						"text-xl",
						"text-white",
						"uppercase",
						"data-[active=true]:text-yellow-200",
					],
				}}
			>
				<NavbarBrand as={Link} href="/">
					<GiMatchTip size={40} className="text-gray-200" />
					<div className="font-bold text-3xl flex">
						<span className="text-gray-900">Next</span>
						<span className="text-gray-200">Match</span>
					</div>
				</NavbarBrand>
				{session && (
					<NavbarContent justify="center">
						{links.map(({ href, label }) => (
							<NavLink key={href} href={href} label={label} />
						))}
					</NavbarContent>
				)}
				<NavbarContent justify="end">
					{userInfo ? (
						<UserMenu userInfo={userInfo} />
					) : (
						<>
							<Button
								as={Link}
								href="/login"
								variant="bordered"
								className="text-white"
							>
								Login
							</Button>
							<Button
								as={Link}
								href="/register"
								variant="bordered"
								className="text-white"
							>
								Register
							</Button>
						</>
					)}
				</NavbarContent>
			</Navbar>
			<FiltersWrapper />
		</>
	);
};

export default TopNav;
