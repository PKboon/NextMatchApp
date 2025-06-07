import { notFound } from "next/navigation";

import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";

const MemberDetailPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;

	const member = await getMemberByUserId(userId);
	if (!member) return notFound();

	return (
		<CardInnerWrapper header="Profile" body={<div>{member.description}</div>} />
	);
};
export default MemberDetailPage;
