import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import MemberPhotos from "@/components/MemberPhotos";

const MemberPhotosPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const photos = await getMemberPhotosByUserId(userId);

	return (
		<CardInnerWrapper header="Photos" body={<MemberPhotos photos={photos} />} />
	);
};

export default MemberPhotosPage;
