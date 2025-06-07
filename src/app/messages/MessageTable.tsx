"use client";

import { Avatar } from "@heroui/avatar";
import { Card } from "@heroui/card";
import { Button } from "@heroui/react";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

import { MessageDto } from "@/types";

import { deleteMessage } from "../actions/messageActions";

type Props = {
	messages: MessageDto[];
};

const MessageTable = ({ messages }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isOutbox = searchParams.get("container") === "outbox";
	const [isDeleting, setDeleting] = useState({ id: "", loading: false });

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

	const renderCell = useCallback(
		(item: MessageDto, columnKey: keyof MessageDto) => {
			const cellValue = item[columnKey];

			switch (columnKey) {
				case "recipientName":
				case "senderName":
					return (
						<div
							className={`flex items-center gap-2 cursor-pointer ${
								!item.dateRead && !isOutbox ? "font-semibold" : ""
							}`}
						>
							<Avatar
								alt="Image of member"
								src={
									(isOutbox ? item.recipientImage : item.senderImage) ||
									"/image/user/png"
								}
							/>
							<span>{cellValue}</span>
						</div>
					);
				case "text":
					return <div className="truncate">{cellValue}</div>;
				case "created":
					return cellValue;
				default:
					return (
						<Button
							isIconOnly
							variant="light"
							onPress={() => handleDeleteMessage(item)}
							isLoading={isDeleting.id === item.id && isDeleting.loading}
						>
							<AiFillDelete size={24} className="text-danger" />
						</Button>
					);
			}
		},
		[handleDeleteMessage, isDeleting.id, isDeleting.loading, isOutbox]
	);

	return (
		<Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
			<Table
				aria-label="Message"
				selectionMode="single"
				onRowAction={(key) => handleRowSelect(key)}
				shadow="none"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody items={messages}>
					{(item) => (
						<TableRow key={item.id} className="cursor-pointer">
							{(columnKey) => (
								<TableCell
									className={`${
										!item.dateRead && !isOutbox ? "font-semibold" : ""
									}`}
								>
									{renderCell(item, columnKey as keyof MessageDto)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
};
export default MessageTable;
