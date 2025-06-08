import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { addToast } from "@heroui/toast";
import Link from "next/link";

import { transformImageUrl } from "@/lib/util";

export const addAvatarToast = (
	title: string,
	href: string,
	image?: string | null
) => {
	addToast({
		title,
		endContent: (
			<Button as={Link} href={href} size="sm" color="secondary" variant="flat">
				Click to view
			</Button>
		),
		icon: (
			<Image
				src={transformImageUrl(image) || "/images/user.png"}
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
