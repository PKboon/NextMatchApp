import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { getAuthUserId } from "@/app/actions/authActions";
import {
	getMemberByUserId,
	getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import MemberPhotos from "@/components/MemberPhotos";

import MemberPhotoUpload from "./MemberPhotoUpload";

const MemberEditPhotoPage = async () => {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);
	const photos = await getMemberPhotosByUserId(userId);

	return (
		<>
			<CardHeader className="text-2xl font-semibold text-secondary">
				Edit Photos
			</CardHeader>
			<Divider />
			<CardBody>
				<MemberPhotoUpload />
				<MemberPhotos
					photos={photos}
					editing={true}
					mainImageUrl={member?.image}
				/>
			</CardBody>
		</>
	);
};
export default MemberEditPhotoPage;
