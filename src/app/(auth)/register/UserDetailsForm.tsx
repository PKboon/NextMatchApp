import { useFormContext } from "react-hook-form";

import { TextInput } from "@/components/ui/TextInput";

const UserDetailsForm = () => {
	const { control } = useFormContext();

	return (
		<div className="space-y-4">
			<TextInput control={control} label="Name" name="name" />
			<TextInput control={control} label="Email" name="email" />
			<TextInput
				control={control}
				label="Password"
				name="password"
				type="password"
			/>
		</div>
	);
};
export default UserDetailsForm;
