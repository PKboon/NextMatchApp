"use client";

import { Image } from "@heroui/image";
import clsx from "clsx";
import { CldImage } from "next-cloudinary";

import { Photo } from "@/generated/prisma";

type Props = {
	photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
	return (
		<div>
			{photo?.publicId ? (
				<CldImage
					alt="Image of member"
					src={photo.publicId}
					width={300}
					height={300}
					crop="fill"
					gravity="faces"
					className={clsx("rounded-2xl", {
						"opacity-40": !photo.isApproved,
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
			{!photo?.isApproved && (
				<div className="absolute bottom-2 w-full bg-slate-200 p-1">
					<div className="flex justify-center text-danger font-semibold">
						Approval pending
					</div>
				</div>
			)}
		</div>
	);
};
export default MemberImage;
