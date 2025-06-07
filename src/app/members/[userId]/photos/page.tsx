import { Image } from "@heroui/image";

import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";

const MemberPhotosPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const photos = await getMemberPhotosByUserId(userId);

	const renderedBody = () => {
		return (
			<div className="grid grid-cols-5 gap-3">
				{photos &&
					photos.map((photo) => (
						<div key={photo.id}>
							<Image
								width={300}
								src={photo.url}
								alt="Image of member"
								className="object-cover aspect-square"
							/>
						</div>
					))}
			</div>
		);
	};

	return <CardInnerWrapper header="Photos" body={renderedBody()} />;
};
export default MemberPhotosPage;
