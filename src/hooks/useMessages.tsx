import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { deleteMessage } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";

import useMessageStore from "./useMessageStore";

export const useMessages = (initialMessages: MessageDto[]) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isOutbox = searchParams.get("container") === "outbox";
	const [isDeleting, setDeleting] = useState({ id: "", loading: false });

	const { set, remove, messages } = useMessageStore(
		useShallow((state) => ({
			set: state.set,
			remove: state.remove,
			messages: state.messages,
		}))
	);

	useEffect(() => {
		set(initialMessages);

		return () => {
			set([]);
		};
	}, [initialMessages, set]);

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
			router.refresh();
			setDeleting({
				id: "",
				loading: false,
			});
		},
		[isOutbox, router]
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
	};
};
