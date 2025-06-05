import { Spinner } from "@heroui/spinner";

const MemberLoading = () => {
	return (
		<div className="flex justify-center items-center vertical-center">
			<Spinner label="Loading..." color="secondary" labelColor="secondary" />
		</div>
	);
};
export default MemberLoading;
