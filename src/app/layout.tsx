import type { Metadata } from "next";

import { auth } from "@/auth";
import TopNav from "@/components/navbar/TopNav";
import Providers from "@/components/Providers";

import "./globals.css";

export const metadata: Metadata = {
	title: "Next Match App",
	description:
		"A modern dating application built with Next.js, PostgreSQL, Prisma, Pusher, Cloudinary, NextAuth, Tailwind, and Zustand. Features user authentication, matching system, real-time messaging, and photo uploads.",
	icons: {
		icon: "/favicon.png",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	const userId = session?.user?.id || null;
	const profileComplete = session?.user.profileComplete as boolean;

	return (
		<html lang="en">
			<body>
				<TopNav />
				<main className="container mx-auto">
					<Providers userId={userId} profileComplete={profileComplete}>
						{children}
					</Providers>
				</main>
			</body>
		</html>
	);
}
