"use client";

import { Image } from "@heroui/image";
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
					className="rounded-2xl"
				/>
			) : (
				<Image
					alt="Image of user"
					width={220}
					src={photo?.url || "/images/user.png"}
				/>
			)}
		</div>
	);
};
export default MemberImage;
