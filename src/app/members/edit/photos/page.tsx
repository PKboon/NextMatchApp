import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";

import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import DeleteButton from "@/components/ui/DeleteButton";
import StarButton from "@/components/ui/StarButton";

const MemberEditPhotoPage = async () => {
	const userId = await getAuthUserId();

	const photos = await getMemberPhotosByUserId(userId);

	return (
		<>
			<CardHeader className="text-2xl font-semibold text-secondary">
				Edit Photos
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="grid grid-cols-5 gap-3 p-5">
					{photos &&
						photos.map((photo) => (
							<div key={photo.id} className="relative">
								<Image width={220} src={photo.url} alt="Image of user" />
								<div className="absolute top-3 left-3 z-50">
									<StarButton selected={true} loading={false} />
								</div>
								<div className="absolute top-3 right-3 z-50">
									<DeleteButton loading={false} />
								</div>
							</div>
						))}
				</div>
			</CardBody>
		</>
	);
};
export default MemberEditPhotoPage;
