"use client";

import { Select, SelectItem } from "@heroui/select";
import { format, subYears } from "date-fns";
import { useFormContext } from "react-hook-form";

import { TextInput } from "@/components/ui/TextInput";
import { useFilters } from "@/hooks/useFilter";

const ProfileForm = () => {
	const {
		control,
		register,
		setValue,
		formState: { errors },
	} = useFormContext();
	const { genderList } = useFilters();

	return (
		<div className="space-y-4">
			<Select
				defaultSelectedKeys={[genderList[0].key]}
				size="sm"
				fullWidth
				label="Gender"
				variant="bordered"
				color="secondary"
				aria-label="Gender selector"
				{...register("gender")}
				isInvalid={!!errors.gender}
				errorMessage={errors.gender?.message as string}
				onChange={(e) => setValue("gender", e.target.value)}
			>
				{genderList.map((item) => (
					<SelectItem key={item.key}>{item.label}</SelectItem>
				))}
			</Select>
			<TextInput
				control={control}
				label="Date of birth"
				name="dateOfBirth"
				type="date"
				max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
			/>
			<TextInput
				multiline={true}
				control={control}
				label="Description"
				name="description"
			/>
			<TextInput control={control} label="City" name="city" />
			<TextInput control={control} label="Country" name="country" />
		</div>
	);
};
export default ProfileForm;
