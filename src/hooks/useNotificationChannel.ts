import { addToast } from "@heroui/toast";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";

import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";

import useMessageStore from "./useMessageStore";

export const useNotificationChannel = (userId: string | null) => {
	const channelRef = useRef<Channel | null>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const add = useMessageStore((state) => state.add);

	const handleNewMessage = useCallback(
		(message: MessageDto) => {
			if (
				pathname === "/messages" &&
				searchParams.get("container") !== "outbox"
			) {
				add(message);
			} else if (pathname !== `/members/${message.senderId}/chat`) {
				addToast({
					title: `New message from ${message.senderName}`,
					color: "primary",
					timeout: 3000,
				});
			}
		},
		[add, pathname, searchParams]
	);

	useEffect(() => {
		if (!userId) return;

		if (!channelRef.current) {
			channelRef.current = pusherClient.subscribe(`private-${userId}`);
			channelRef.current.bind("message:new", handleNewMessage);
		}

		return () => {
			if (channelRef.current && channelRef.current.subscribed) {
				channelRef.current.unsubscribe();
				channelRef.current.unbind_all();
				channelRef.current = null;
			}
		};
	}, [handleNewMessage, userId]);
};
