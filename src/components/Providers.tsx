"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ReactNode } from "react";

import { usePresenceChannel } from "@/hooks/usePresonceChannel";

const Providers = ({ children }: { children: ReactNode }) => {
	usePresenceChannel();

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
