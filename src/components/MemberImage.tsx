"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { ImCheckmark, ImCross } from "react-icons/im";

import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { Photo } from "@/generated/prisma";
import { useRole } from "@/hooks/useRole";

import AppModal from "./AppModal";

type Props = {
	photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
	const router = useRouter();

	const { role } = useRole();
	const isAdmin = role === "ADMIN";

	const { isOpen, onOpen, onClose } = useDisclosure();

	const approve = async (photoId: string) => {
		try {
			await approvePhoto(photoId);
			router.refresh();
		} catch (error: unknown) {
			addToast({
				description:
					error instanceof Error ? error.message : "Something went wrong",
				color: "danger",
				hideCloseButton: true,
			});
		}
	};

	const reject = async (photo: Photo) => {
		try {
			await rejectPhoto(photo);
			router.refresh();
		} catch (error: unknown) {
			addToast({
				description:
					error instanceof Error ? error.message : "Something went wrong",
				color: "danger",
				hideCloseButton: true,
			});
		}
	};

	if (!photo) return null;

	return (
		<div className="cursor-pointer" onClick={() => onOpen()}>
			{photo?.publicId ? (
				<CldImage
					alt="Image of member"
					src={photo.publicId}
					width={300}
					height={300}
					crop="fill"
					gravity="faces"
					className={clsx("rounded-2xl", {
						"opacity-40": !photo.isApproved && !isAdmin,
					})}
					priority
				/>
			) : (
				<Image
					alt="Image of user"
					width={220}
					src={photo?.url || "/images/user.png"}
				/>
			)}
			{!photo?.isApproved && !isAdmin && (
				<div className="absolute bottom-2 w-full bg-slate-200 p-1">
					<div className="flex justify-center text-danger font-semibold">
						Approval pending
					</div>
				</div>
			)}
			{isAdmin && (
				<div className="flex gap-2 mt-2 w-full">
					<Button
						color="success"
						variant="bordered"
						className="w-full"
						isIconOnly
						onPress={() => approve(photo.id)}
					>
						<ImCheckmark size={20} />
					</Button>
					<Button
						color="danger"
						variant="bordered"
						className="w-full"
						isIconOnly
						onPress={() => reject(photo)}
					>
						<ImCross size={20} />
					</Button>
				</div>
			)}
			<AppModal
				imageModal={true}
				isOpen={isOpen}
				onClose={onClose}
				body={
					<>
						{photo?.publicId ? (
							<CldImage
								alt="Image of member"
								src={photo.publicId}
								width={750}
								height={750}
								className={clsx("rounded-2xl", {
									"opacity-40": !photo.isApproved && !isAdmin,
								})}
								priority
							/>
						) : (
							<Image
								alt="Image of user"
								width={750}
								src={photo?.url || "/images/user.png"}
							/>
						)}
					</>
				}
			/>
		</div>
	);
};
export default MemberImage;
