import { getMessageThread } from "@/app/actions/messageActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";

import ChatForm from "./ChatForm";

const MemberChatPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const { userId } = await params;
	const messages = await getMessageThread(userId);
	console.log({ messages });

	return (
		<CardInnerWrapper
			header="Chat"
			body={<div>yay</div>}
			footer={<ChatForm />}
		/>
	);
};
export default MemberChatPage;
