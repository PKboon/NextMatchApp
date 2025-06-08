import EmptyState from "@/components/EmptyState";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { GetMemberParams } from "@/types";

import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";

const MembersPage = async ({
	searchParams,
}: {
	searchParams: Promise<GetMemberParams>;
}) => {
	const userFilters = await searchParams;
	const { items: members, totalCount } = await getMembers(userFilters);
	const hasMembers = members && members.length > 0 && totalCount > 0;

	const likeIds = await fetchCurrentUserLikeIds();

	return (
		<>
			{hasMembers ? (
				<div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
					{members &&
						members.map((member) => (
							<MemberCard key={member.id} member={member} likeIds={likeIds} />
						))}
				</div>
			) : (
				<EmptyState />
			)}
			<PaginationComponent hasMembers={hasMembers} totalCount={totalCount} />
		</>
	);
};

export default MembersPage;
