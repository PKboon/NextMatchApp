import MessageSidebar from "./MessageSidebar";

const MessagesPage = () => {
	return (
		<div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
			<div className="col-span-2">
				<MessageSidebar />
			</div>
			<div className="col-span-10">yay</div>
		</div>
	);
};

export default MessagesPage;
