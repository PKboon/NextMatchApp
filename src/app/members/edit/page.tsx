import { notFound } from "next/navigation";

import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";

import MemberEditForm from "./MemberEditForm";

const MemberEditPage = async () => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) return notFound();

	return (
		<CardInnerWrapper
			header="Edit Profile"
			body={<MemberEditForm member={member} />}
		/>
	);
};

export default MemberEditPage;
