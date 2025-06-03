import { Input, InputProps } from "@heroui/input";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type Props<TFieldValues extends FieldValues = FieldValues> = {
	control: Control<TFieldValues>;
	label?: string;
	name: Path<TFieldValues>;
	type?: string;
} & InputProps;

export const TextInput = <TFieldValues extends FieldValues = FieldValues>({
	control,
	label,
	name,
	type = "text",
	...props
}: Props<TFieldValues>) => {
	const {
		field,
		fieldState: { error },
	} = useController<TFieldValues>({ control, name });

	return (
		<Input
			{...props}
			type={type}
			label={label}
			variant="bordered"
			isInvalid={!!error}
			errorMessage={error?.message}
			{...field}
		/>
	);
};
