import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";

import { addAvatarToast } from "@/components/AvatarToast";
import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";

import useMessageStore from "./useMessageStore";

export const useNotificationChannel = (
	userId: string | null,
	profileComplete: boolean
) => {
	const channelRef = useRef<Channel | null>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const add = useMessageStore((state) => state.add);
	const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

	const handleNewMessage = useCallback(
		(message: MessageDto) => {
			const chatPath = `/members/${message.senderId}/chat`;

			if (
				pathname === "/messages" &&
				searchParams.get("container") !== "outbox"
			) {
				add(message);
				updateUnreadCount(1);
			} else if (pathname !== chatPath) {
				addAvatarToast(
					`${message.senderName} sent you a message`,
					chatPath,
					message.senderImage
				);
				updateUnreadCount(1);
			}
		},
		[add, pathname, searchParams, updateUnreadCount]
	);

	const handleNewLike = useCallback(
		(data: { name: string; image: string | null; userId: string }) => {
			addAvatarToast(
				`You have been liked by ${data.name}`,
				`/members/${data.userId}`,
				data.image
			);
		},
		[]
	);

	useEffect(() => {
		if (!userId || profileComplete) return;

		if (!channelRef.current) {
			channelRef.current = pusherClient.subscribe(`private-${userId}`);
			channelRef.current.bind("message:new", handleNewMessage);
			channelRef.current.bind("like:new", handleNewLike);
		}

		return () => {
			if (channelRef.current && channelRef.current.subscribed) {
				channelRef.current.unsubscribe();
				channelRef.current.unbind_all();
				channelRef.current = null;
			}
		};
	}, [handleNewLike, handleNewMessage, profileComplete, userId]);
};
