"use client";

import { Card } from "@heroui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table";

import { useMessages } from "@/hooks/useMessages";
import { MessageDto } from "@/types";

import MessageTableCell from "./MessageTableCell";

type Props = {
	initialMessages: MessageDto[];
};

const MessageTable = ({ initialMessages }: Props) => {
	const { messages, columns, isOutbox, isDeleting, deleteMessage, selectRow } =
		useMessages(initialMessages);

	return (
		<Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
			<Table
				aria-label="Message"
				selectionMode="single"
				onRowAction={(key) => selectRow(key)}
				shadow="none"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.key}
							width={column.key === "text" ? "50%" : undefined}
						>
							{column.label}
						</TableColumn>
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
									<MessageTableCell
										item={item}
										columnKey={columnKey}
										isOutbox={isOutbox}
										deleteMessage={deleteMessage}
										isDeleting={isDeleting.loading && isDeleting.id === item.id}
									/>
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
