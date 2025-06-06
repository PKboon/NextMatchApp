import { Spinner } from "@heroui/spinner";

const LoadingComponent = ({ label }: { label?: string }) => {
	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<Spinner
				label={label || "Loading..."}
				color="secondary"
				labelColor="secondary"
			/>
		</div>
	);
};
export default LoadingComponent;
