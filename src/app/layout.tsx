import type { Metadata } from "next";

import TopNav from "@/components/navbar/TopNav";
import Providers from "@/components/Providers";

import "./globals.css";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TopNav />
				<main className="container mx-auto">
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	);
}
