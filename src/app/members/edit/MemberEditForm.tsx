"use client";

import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { updateMemberProfile } from "@/app/actions/userActions";
import { TextInput } from "@/components/ui/TextInput";
import {
	MemberEditSchema,
	memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { handleFormServerErrors } from "@/lib/util";

type Props = {
	member: Member;
};

const MemberEditForm = ({ member }: Props) => {
	const router = useRouter();
	const {
		control,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isDirty, isValid, isSubmitting },
	} = useForm<MemberEditSchema>({
		resolver: zodResolver(memberEditSchema),
		mode: "onTouched",
	});

	useEffect(() => {
		reset({
			name: member.name,
			description: member.description,
			city: member.city,
			country: member.country,
		});
	}, [member, reset]);

	const onSubmit = async (data: MemberEditSchema) => {
		const nameUpdated = data.name !== member.name;
		const result = await updateMemberProfile(data, nameUpdated);

		if (result.status === "success") {
			router.refresh();
			reset({ ...data });
		} else {
			handleFormServerErrors(result, setError);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
			<TextInput control={control} label="Name" name="name" />
			<TextInput
				multiline={true}
				control={control}
				label="Desciption"
				name="description"
				minRows={6}
			/>
			<div className="flex gap-3">
				<TextInput control={control} label="City" name="city" />
				<TextInput control={control} label="Country" name="country" />
			</div>
			{errors.root?.serverError && (
				<p className="text-danger text-sm">{errors.root.serverError.message}</p>
			)}
			<Button
				type="submit"
				className="flex self-end"
				variant="solid"
				isDisabled={!isValid || !isDirty}
				isLoading={isSubmitting}
				color="secondary"
				onPress={() => {
					if (JSON.stringify(errors) === "{}") {
						addToast({
							title: "Profile updated",
							color: "success",
						});
					}
				}}
			>
				Update profile
			</Button>
		</form>
	);
};
export default MemberEditForm;
