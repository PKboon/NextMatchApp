import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";

import { getMemberPhotosByUserId } from "@/app/actions/memberActions";

const MemberPhotosPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const photos = await getMemberPhotosByUserId(userId);

	return (
		<>
			<CardHeader className="text-2xl font-semibold text-secondary">
				Photos
			</CardHeader>
			<Divider />
			<CardBody>
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
			</CardBody>
		</>
	);
};
export default MemberPhotosPage;
