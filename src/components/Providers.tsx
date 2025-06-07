"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ReactNode } from "react";

import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";

const Providers = ({
	children,
	userId,
}: {
	children: ReactNode;
	userId: string | null;
}) => {
	usePresenceChannel();
	useNotificationChannel(userId);

	return (
		<HeroUIProvider>
			{children}
			<ToastProvider
				toastProps={{
					radius: "md",
					variant: "flat",
					timeout: 3000,
					classNames: {
						closeButton:
							"opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
					},
				}}
			/>
		</HeroUIProvider>
	);
};

export default Providers;
