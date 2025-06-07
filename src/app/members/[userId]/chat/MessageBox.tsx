"use client";

import { Avatar } from "@heroui/avatar";
import { clsx } from "clsx";
import { useEffect, useRef } from "react";

import { transformImageUrl } from "@/lib/util";
import { MessageDto } from "@/types";

type Props = {
	message: MessageDto;
	currentUserId: string;
};

const MessageBox = ({ message, currentUserId }: Props) => {
	const isCurrentUserSender = message.senderId === currentUserId;
	const messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messageEndRef]);

	const renderAvatar = () => (
		<Avatar
			name={message.senderName}
			className="self-end"
			src={transformImageUrl(message.senderImage) || "/image/user.png"}
		/>
	);

	const renderMessageHeader = () => (
		<div
			className={clsx("flex items-center w-full", {
				"justify-between": isCurrentUserSender,
			})}
		>
			<span className="text-xs text-black italic">
				{message.dateRead &&
					message.recipientId !== currentUserId &&
					"Read a min ago"}
			</span>

			<div className="flex">
				<span className="text-sm font-semibold text-gray-900">
					{message.senderName}
				</span>
				<span className="text-sm text-gray-500 ml-2">{message.created}</span>
			</div>
		</div>
	);

	const messageContentClasses = clsx("flex flex-col w-[50%] px-5 py-1", {
		"rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
		"rounded-r-xl rounded-tl-xl border-gray-200 bg-neutral-200/70":
			!isCurrentUserSender,
	});
	const renderMessageContent = () => (
		<div className={messageContentClasses}>
			{renderMessageHeader()}
			<p className="text-sm py-3 text-neutral-900">{message.text}</p>
		</div>
	);

	return (
		<div className="grid grid-rows-1">
			<div
				className={clsx("flex gap-2 mb-3", {
					"justify-end text-right": isCurrentUserSender,
					"justify-start": !isCurrentUserSender,
				})}
			>
				{!isCurrentUserSender && renderAvatar()}
				{renderMessageContent()}
				{isCurrentUserSender && renderAvatar()}
			</div>
			<div ref={messageEndRef} />
		</div>
	);
};

export default MessageBox;
