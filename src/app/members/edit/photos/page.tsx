import { getAuthUserId } from "@/app/actions/authActions";
import {
	getMemberByUserId,
	getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import MemberPhotos from "@/components/MemberPhotos";

import MemberPhotoUpload from "./MemberPhotoUpload";

const MemberEditPhotoPage = async () => {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);
	const photos = await getMemberPhotosByUserId(userId);

	return (
		<CardInnerWrapper
			header={
				<>
					<div className="text-2xl font-semibold text-secondary">
						Edit Photos
					</div>
					<MemberPhotoUpload />
				</>
			}
			body={
				<MemberPhotos
					photos={photos}
					editing={true}
					mainImageUrl={member?.image}
				/>
			}
		/>
	);
};
export default MemberEditPhotoPage;
