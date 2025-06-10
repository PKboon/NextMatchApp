import CardWrapper from "./CardWrapper";

const EmptyState = () => {
	return (
		<CardWrapper
			headerText="There are no results for this filter"
			subHeaderText="Please select a different filter"
		/>
	);
};
export default EmptyState;
