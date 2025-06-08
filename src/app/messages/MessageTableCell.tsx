import { Button } from "@heroui/button";
import { Key } from "react";
import { AiFillDelete } from "react-icons/ai";

import PresenseAvatar from "@/components/PresenseAvatar";
import { truncateString } from "@/lib/util";
import { MessageDto } from "@/types";

type Props = {
	item: MessageDto;
	columnKey: Key;
	isOutbox: boolean;
	deleteMessage: (message: MessageDto) => void;
	isDeleting: boolean;
};

const MessageTableCell = ({
	item,
	columnKey,
	isOutbox,
	deleteMessage,
	isDeleting,
}: Props) => {
	const cellValue = item[columnKey as keyof MessageDto];

	switch (columnKey) {
		case "recipientName":
		case "senderName":
			return (
				<div
					className={`flex items-center gap-2 cursor-pointer ${
						!item.dateRead && !isOutbox ? "font-bold" : ""
					}`}
				>
					<PresenseAvatar
						userId={isOutbox ? item.recipientId : item.senderId}
						src={(isOutbox ? item.recipientImage : item.senderImage) || null}
					/>
					<span>{cellValue}</span>
				</div>
			);
		case "text":
			return <div>{truncateString(cellValue, 75)}</div>;
		case "created":
			return cellValue;
		default:
			return (
				<Button
					isIconOnly
					variant="light"
					onPress={() => deleteMessage(item)}
					isLoading={isDeleting}
				>
					<AiFillDelete size={24} className="text-danger" />
				</Button>
			);
	}
};

export default MessageTableCell;
