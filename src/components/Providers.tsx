"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useCallback, useEffect } from "react";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";

const Providers = ({
	children,
	userId,
	profileComplete,
}: {
	children: ReactNode;
	userId: string | null;
	profileComplete: boolean;
}) => {
	const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

	const setUnreadCount = useCallback(
		(amount: number) => {
			updateUnreadCount(amount);
		},
		[updateUnreadCount]
	);

	useEffect(() => {
		if (!userId) return;

		getUnreadMessageCount().then((count) => {
			setUnreadCount(count);
		});
	}, [setUnreadCount, userId]);

	usePresenceChannel(userId, profileComplete);
	useNotificationChannel(userId, profileComplete);

	return (
		<SessionProvider>
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
		</SessionProvider>
	);
};

export default Providers;
