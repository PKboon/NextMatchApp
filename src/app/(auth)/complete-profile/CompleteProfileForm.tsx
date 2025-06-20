"use client";

import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { RiProfileLine } from "react-icons/ri";

import { completeSocialLoginProfile } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import { ProfileSchema, profileSchema } from "@/lib/schemas/registerSchema";

import ProfileForm from "../register/ProfileForm";

const CompleteProfileForm = () => {
	const methods = useForm<ProfileSchema>({
		resolver: zodResolver(profileSchema),
		mode: "onTouched",
	});

	const {
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
	} = methods;

	const onSubmit = async (data: ProfileSchema) => {
		const result = await completeSocialLoginProfile(data);

		if (result.status === "success") {
			signIn(result.data, {
				callbackUrl: "/members",
			});
		}
	};

	return (
		<CardWrapper
			headerText="About you"
			subHeaderText="Please complete your profile to continue to the app"
			headerIcon={RiProfileLine}
			body={
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-4">
							<ProfileForm />
							{errors.root?.serverError && (
								<p className="text-danger text-sm">
									{errors.root.serverError.message}
								</p>
							)}
							<div className="flex flex-grow items-center gap-6">
								<Button
									isLoading={isSubmitting}
									isDisabled={!isValid}
									fullWidth
									color="secondary"
									type="submit"
								>
									Submit
								</Button>
							</div>
						</div>
					</form>
				</FormProvider>
			}
		/>
	);
};
export default CompleteProfileForm;
