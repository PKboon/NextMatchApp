"use client";

import { Button } from "@heroui/button";
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
	nextCursor?: string;
};

const MessageTable = ({ initialMessages, nextCursor }: Props) => {
	const {
		messages,
		columns,
		isOutbox,
		isDeleting,
		deleteMessage,
		selectRow,
		isLoadingMore,
		loadMore,
		hasMore,
	} = useMessages(initialMessages, nextCursor);

	return (
		<div className="flex flex-col h-[80vh]">
			<Card>
				<Table
					className="flex flex-col gap-3 h-[80vh] overflow-auto"
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
											isDeleting={
												isDeleting.loading && isDeleting.id === item.id
											}
										/>
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
				<div className="sticky bottom-0 pb-3 mr-3 text-right">
					<Button
						color="secondary"
						isLoading={isLoadingMore}
						isDisabled={!hasMore}
						onPress={loadMore}
					>
						{hasMore ? "Load more" : "No more messages"}{" "}
					</Button>
				</div>
			</Card>
		</div>
	);
};
export default MessageTable;
