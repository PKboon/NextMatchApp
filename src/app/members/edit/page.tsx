import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { notFound } from "next/navigation";

import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";

import MemberEditForm from "./MemberEditForm";

const MemberEditPage = async () => {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) return notFound();
	return (
		<>
			<CardHeader className="text-2xl font-semibold text-secondary">
				Edit Profile
			</CardHeader>
			<Divider />
			<CardBody>
				<MemberEditForm member={member} />
			</CardBody>
		</>
	);
};

export default MemberEditPage;
