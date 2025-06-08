import EmptyState from "@/components/EmptyState";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { UserFilters } from "@/types";

import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";

const MembersPage = async ({
	searchParams,
}: {
	searchParams: Promise<UserFilters>;
}) => {
	const userFilters = await searchParams;
	const members = await getMembers(userFilters);

	const likeIds = await fetchCurrentUserLikeIds();

	return (
		<>
			{!members || members.length === 0 ? (
				<EmptyState />
			) : (
				<>
					<div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
						{members &&
							members.map((member) => (
								<MemberCard key={member.id} member={member} likeIds={likeIds} />
							))}
					</div>
					<PaginationComponent />
				</>
			)}
		</>
	);
};

export default MembersPage;
