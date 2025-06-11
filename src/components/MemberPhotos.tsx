"use client";

import { addToast } from "@heroui/toast";
import { Photo } from "generated";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deletePhoto, setMainImage } from "@/app/actions/userActions";

import MemberImage from "./MemberImage";
import DeleteButton from "./ui/DeleteButton";
import StarButton from "./ui/StarButton";

type Props = {
	photos: Photo[] | null;
	editing?: boolean;
	mainImageUrl?: string | null;
};

const MemberPhotos = ({ photos, editing, mainImageUrl }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState({
		type: "",
		isLoading: false,
		id: "",
	});

	const onSetMain = async (photo: Photo) => {
		if (photo.url === mainImageUrl) return null;
		setLoading({ type: "main", isLoading: true, id: photo.id });

		try {
			await setMainImage(photo);
			router.refresh();
		} catch (error: unknown) {
			addToast({
				description:
					error instanceof Error ? error.message : "Something went wrong",
				color: "danger",
				hideCloseButton: true,
			});
		} finally {
			setLoading({ type: "", isLoading: false, id: "" });
		}
	};

	const onDelete = async (photo: Photo) => {
		if (photo.url === mainImageUrl) return null;
		setLoading({ type: "delete", isLoading: true, id: photo.id });
		await deletePhoto(photo);
		router.refresh();
		setLoading({ type: "", isLoading: false, id: "" });
	};

	return (
		<div className="grid grid-cols-5 gap-3 p-5">
			{photos &&
				photos.map((photo) => (
					<div key={photo.id} className="relative">
						<MemberImage photo={photo} />

						{editing && (
							<>
								<div
									className="absolute top-3 left-3 z-50"
									onClick={() => onSetMain(photo)}
								>
									<StarButton
										selected={photo.url === mainImageUrl}
										loading={
											loading.isLoading &&
											loading.type === "main" &&
											loading.id === photo.id
										}
									/>
								</div>
								<div
									className="absolute top-3 right-3 z-50"
									onClick={() => onDelete(photo)}
								>
									<DeleteButton
										loading={
											loading.isLoading &&
											loading.type === "delete" &&
											loading.id === photo.id
										}
									/>
								</div>
							</>
						)}
					</div>
				))}
		</div>
	);
};
export default MemberPhotos;
