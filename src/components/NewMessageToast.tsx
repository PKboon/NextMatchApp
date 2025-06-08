import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { addToast } from "@heroui/toast";
import Link from "next/link";

import { transformImageUrl } from "@/lib/util";
import { MessageDto } from "@/types";

export const addNewMessageToast = (message: MessageDto) => {
	addToast({
		title: `${message.senderName} sent you a message`,
		endContent: (
			<Button
				as={Link}
				href={`/members/${message.senderId}/chat`}
				size="sm"
				color="primary"
				variant="flat"
			>
				Click to view
			</Button>
		),
		icon: (
			<Image
				src={transformImageUrl(message.senderImage) || "/images/user.png"}
				width={50}
				alt="Sender image"
			/>
		),
		variant: "bordered",
		color: "secondary",
		timeout: 3000,
		classNames: {
			icon: "w-12 h-12 min-w-12",
			closeButton: "w-6 h-6",
			closeIcon: "w-full h-full",
		},
	});
};
