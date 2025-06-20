import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

import {
	deleteMessage,
	getMessagesByContainer,
} from "@/app/actions/messageActions";
import { MessageDto } from "@/types";

import useMessageStore from "./useMessageStore";

export const useMessages = (
	initialMessages: MessageDto[],
	nextCursor?: string
) => {
	const cursorRef = useRef(nextCursor);

	const searchParams = useSearchParams();
	const router = useRouter();

	const container = searchParams.get("container");
	const isOutbox = container === "outbox";

	const [isDeleting, setDeleting] = useState({ id: "", loading: false });
	const [isLoadingMore, setLoadingMore] = useState(false);

	const { set, remove, messages, updateUnreadCount, resetMessages } =
		useMessageStore(
			useShallow((state) => ({
				set: state.set,
				remove: state.remove,
				messages: state.messages,
				updateUnreadCount: state.updateUnreadCount,
				resetMessages: state.resetMessages,
			}))
		);

	useEffect(() => {
		set(initialMessages);
		cursorRef.current = nextCursor;

		return () => {
			resetMessages();
		};
	}, [initialMessages, nextCursor, resetMessages, set]);

	const loadMore = useCallback(async () => {
		if (cursorRef.current) {
			setLoadingMore(true);
			const { messages, nextCursor } = await getMessagesByContainer(
				container,
				cursorRef.current
			);
			set(messages);
			cursorRef.current = nextCursor;
			setLoadingMore(false);
		}
	}, [container, set]);

	const columns = [
		{
			key: isOutbox ? "recipientName" : "senderName",
			label: isOutbox ? "Recipient" : "Sender",
		},
		{
			key: "text",
			label: "Message",
		},
		{
			key: "created",
			label: isOutbox ? "Date sent" : "Date received",
		},
		{
			key: "actions",
			label: "Actions",
		},
	];

	const handleDeleteMessage = useCallback(
		async (message: MessageDto) => {
			setDeleting({
				id: message.id,
				loading: true,
			});
			await deleteMessage(message.id, isOutbox);
			remove(message.id);

			if (!message.dateRead && !isOutbox) updateUnreadCount(-1);

			setDeleting({
				id: "",
				loading: false,
			});
		},
		[isOutbox, remove, updateUnreadCount]
	);

	const handleRowSelect = (key: Key) => {
		const message = messages.find((m) => m.id === key);
		const url = isOutbox
			? `/members/${message?.recipientId}`
			: `/members/${message?.senderId}`;
		router.push(url + "/chat");
	};

	return {
		messages,
		columns,
		isOutbox,
		isDeleting,
		deleteMessage: handleDeleteMessage,
		selectRow: handleRowSelect,
		isLoadingMore,
		loadMore,
		hasMore: !!cursorRef.current,
	};
};
