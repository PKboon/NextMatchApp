"use client";

import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

import { generateResetPasswordEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { TextInput } from "@/components/ui/TextInput";
import {
	ForgotPasswordSchema,
	forgotPasswordSchema,
} from "@/lib/schemas/forgotPasswordSchema";
import { ActionResult } from "@/types";

const ForgotPasswordForm = () => {
	const [result, setResult] = useState<ActionResult<string> | null>(null);
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, isValid },
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: FieldValues) => {
		setResult(await generateResetPasswordEmail(data.email));
		reset({ email: "" });
	};

	return (
		<CardWrapper
			headerIcon={GiPadlock}
			headerText="Forgot password"
			subHeaderText="Please enter your email address and we will send you a link to reset your password"
			body={
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
					<TextInput
						control={control}
						name="email"
						label="Email"
						type="email"
					/>
					<Button
						type="submit"
						color="secondary"
						isLoading={isSubmitting}
						isDisabled={!isValid}
					>
						Send reset email
					</Button>
				</form>
			}
			footer={result && <ResultMessage result={result} />}
		/>
	);
};
export default ForgotPasswordForm;
