import { getAuthUserId } from "@/app/actions/authActions";
import { getMessageThread } from "@/app/actions/messageActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { createChatId } from "@/lib/util";

import ChatForm from "./ChatForm";
import MessageList from "./MessageList";

const MemberChatPage = async ({
	params,
}: {
	params: Promise<{ userId: string }>;
}) => {
	const currentUserId = await getAuthUserId();

	const { userId } = await params;
	const messages = await getMessageThread(userId);
	const chatId = createChatId(currentUserId, userId);

	return (
		<CardInnerWrapper
			header="Chat"
			body={
				<MessageList
					initialMessages={messages}
					currentUserId={currentUserId}
					chatId={chatId}
				/>
			}
			footer={<ChatForm />}
		/>
	);
};

export default MemberChatPage;
