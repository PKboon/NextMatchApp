"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GiMatchTip } from "react-icons/gi";

import { registerUser } from "@/app/actions/authActions";
import {
	ProfileSchema,
	profileSchema,
	RegisterSchema,
	registerSchema,
} from "@/lib/schemas/registerSchema";
import { handleFormServerErrors } from "@/lib/util";

import ProfileForm from "./ProfileForm";
import UserDetailsForm from "./UserDetailsForm";

const RegisterForm = () => {
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(0);

	const registerMedthods = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: "onTouched",
	});

	const profileMedthods = useForm<ProfileSchema>({
		resolver: zodResolver(profileSchema),
		mode: "onTouched",
	});

	const onSubmit = async () => {
		const result = await registerUser({
			...registerMedthods.getValues(),
			...profileMedthods.getValues(),
		});

		if (result.status === "success") {
			router.push("/register/success");
		} else {
			handleFormServerErrors(
				result,
				registerMedthods.setError || profileMedthods.setError
			);
		}
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <UserDetailsForm />;
			case 1:
				return <ProfileForm />;
			default:
				return "Unknown step";
		}
	};

	const onBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const onNext = async () => {
		if (activeStep === 1) {
			await onSubmit();
		} else {
			setActiveStep((prev) => prev + 1);
		}
	};

	return (
		<Card className="w-2/5 mx-auto">
			<CardHeader className="flex flex-col items-center justify-center">
				<div className="flex flex-col gap-2 items-center text-secondary">
					<div className="flex flex-row items-center gap-3">
						<GiMatchTip size={30} />
						<h1 className="text-3xl font-semibold">Register</h1>
					</div>
					<p className="text-neutral-500">Welcome to NextMatch</p>
				</div>
			</CardHeader>
			<CardBody>
				<FormProvider
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					{...((activeStep === 0 ? registerMedthods : profileMedthods) as any)}
				>
					<form
						onSubmit={
							activeStep === 1
								? profileMedthods.handleSubmit(onNext)
								: registerMedthods.handleSubmit(onNext)
						}
						className="space-y-4"
					>
						<div className="space-y-4">
							{getStepContent(activeStep)}

							{(registerMedthods.formState.errors.root?.serverError ||
								profileMedthods.formState.errors.root?.serverError) && (
								<p className="text-danger text-sm">
									{registerMedthods.formState.errors.root?.serverError
										.message ||
										profileMedthods.formState.errors.root?.serverError.message}
								</p>
							)}

							<div className="flex item-center gap-6">
								{activeStep === 1 && (
									<Button onPress={onBack} fullWidth>
										Back
									</Button>
								)}
								<Button
									isLoading={
										activeStep === 1 && profileMedthods.formState.isSubmitting
									}
									isDisabled={
										activeStep === 1
											? !profileMedthods.formState.isValid
											: !registerMedthods.formState.isValid
									}
									fullWidth
									color="secondary"
									type="submit"
								>
									{activeStep === 1 ? "Submit" : "Continue"}
								</Button>
							</div>
						</div>
					</form>
				</FormProvider>
			</CardBody>
		</Card>
	);
};
export default RegisterForm;
