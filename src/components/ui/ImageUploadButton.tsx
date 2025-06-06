"use client";

import {
	CldUploadButton,
	CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

type Props = {
	onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

const ImageUploadButton = ({ onUploadImage }: Props) => {
	return (
		<CldUploadButton
			options={{ maxFiles: 1 }}
			onSuccess={onUploadImage}
			signatureEndpoint="/api/sign-image"
			uploadPreset="next-match-app"
			className="flex items-center gap-2 border-2 border-secondary text-secondary rounded-lg py-2 px-4 hover:bg-secondary/10 cursor-pointer"
		>
			<HiPhoto size={28} />
			Upload new image
		</CldUploadButton>
	);
};
export default ImageUploadButton;
