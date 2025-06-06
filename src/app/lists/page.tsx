import {
	fetchCurrentUserLikeIds,
	fetchLikedMembers,
} from "../actions/likeActions";
import ListTab from "./ListTab";

const ListsPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ type: string }>;
}) => {
	const { type } = await searchParams;

	const likeIds = await fetchCurrentUserLikeIds();
	const members = await fetchLikedMembers(type);

	return (
		<div>
			<ListTab members={members} likeIds={likeIds} />
		</div>
	);
};

export default ListsPage;
