"use client";

import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/ui/ImageUploadButton";

const MemberPhotoUpload = () => {
	const router = useRouter();

	const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
		if (result.info && typeof result.info === "object") {
			await addImage(result.info.secure_url, result.info.public_id);
			router.refresh();
		} else {
			addToast({
				title: "Problem adding image",
				color: "danger",
			});
		}
	};

	return (
		<div>
			<ImageUploadButton onUploadImage={onAddImage} />
		</div>
	);
};
export default MemberPhotoUpload;
