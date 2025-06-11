import { Button, ButtonProps } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Key } from "react";
import { AiFillDelete } from "react-icons/ai";

import AppModal from "@/components/AppModal";
import PresenceAvatar from "@/components/PresenceAvatar";
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

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onConfirmDeleteMessage = () => {
		deleteMessage(item);
	};

	const footerButtons: ButtonProps[] = [
		{ color: "default", onClick: onClose, children: "Cancel" },
		{
			color: "danger",
			onPress: onConfirmDeleteMessage,
			children: "Confirm",
		},
	];

	switch (columnKey) {
		case "recipientName":
		case "senderName":
			return (
				<div
					className={`flex items-center gap-2 cursor-pointer ${
						!item.dateRead && !isOutbox ? "font-bold" : ""
					}`}
				>
					<PresenceAvatar
						userId={isOutbox ? item.recipientId : item.senderId}
						src={(isOutbox ? item.recipientImage : item.senderImage) || null}
					/>
					<span>{cellValue}</span>
				</div>
			);
		case "text":
			return <div>{truncateString(cellValue, 75)}</div>;
		case "created":
			return <div>{cellValue}</div>;
		default:
			return (
				<>
					<Button
						isIconOnly
						variant="light"
						onPress={() => onOpen()}
						isLoading={isDeleting}
					>
						<AiFillDelete size={24} className="text-danger" />
					</Button>
					<AppModal
						isOpen={isOpen}
						onClose={onClose}
						header="Please confirm this action"
						body={
							<div>
								Are you sure you want to delete this message? This cannot be
								undone.
							</div>
						}
						footerButtons={footerButtons}
					/>
				</>
			);
	}
};

export default MessageTableCell;
