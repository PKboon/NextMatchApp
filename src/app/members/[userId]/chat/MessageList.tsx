"use client";

import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef, useState } from "react";

import useMessageStore from "@/hooks/useMessageStore";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/util";
import { MessageDto } from "@/types";

import MessageBox from "./MessageBox";

type Props = {
	initialMessages: { messages: MessageDto[]; readCount: number };
	currentUserId: string;
	chatId: string;
};

const MessageList = ({ initialMessages, currentUserId, chatId }: Props) => {
	const channelRef = useRef<Channel | null>(null);
	const [messages, setMessages] = useState(initialMessages.messages);
	const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

	// Because use restrict runs twice
	const setReadCount = useRef(false);

	useEffect(() => {
		if (!setReadCount.current) {
			updateUnreadCount(-initialMessages.readCount);
			setReadCount.current = true;
		}
	}, [initialMessages.readCount, updateUnreadCount]);

	const handleNewMessage = useCallback((message: MessageDto) => {
		setMessages((prev) => {
			return [...prev, message];
		});
	}, []);

	const handleReadMessages = useCallback((messageIds: string[]) => {
		setMessages((prev) =>
			prev.map((message) =>
				messageIds.includes(message.id)
					? { ...message, dateRead: formatShortDateTime(new Date()) }
					: message
			)
		);
	}, []);

	useEffect(() => {
		if (!channelRef.current) {
			channelRef.current = pusherClient.subscribe(chatId);

			channelRef.current.bind("message:new", handleNewMessage);
			channelRef.current.bind("message:read", handleReadMessages);
		}

		return () => {
			if (channelRef.current && channelRef.current.subscribed) {
				channelRef.current.unsubscribe();
				channelRef.current.unbind_all();
			}
		};
	}, [chatId, handleNewMessage, handleReadMessages]);

	return (
		<div>
			{messages.length === 0 ? (
				"No messages to display"
			) : (
				<div>
					{messages.map((message) => (
						<MessageBox
							key={message.id}
							message={message}
							currentUserId={currentUserId}
						/>
					))}
				</div>
			)}
		</div>
	);
};
export default MessageList;
