import CardInnerWrapper from "@/components/CardInnerWrapper";

import ChatForm from "./ChatForm";

const MemberChatPage = () => {
	return (
		<CardInnerWrapper
			header="Chat"
			body={<div>yay</div>}
			footer={<ChatForm />}
		/>
	);
};
export default MemberChatPage;
