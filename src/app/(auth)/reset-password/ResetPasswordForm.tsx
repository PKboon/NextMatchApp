"use client";

import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

import { resetPassword } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { TextInput } from "@/components/ui/TextInput";
import {
	ResetPasswordSchema,
	resetPasswordSchema,
} from "@/lib/schemas/resetPasswordSchema";
import { ActionResult } from "@/types";

const ResetPasswordForm = () => {
	const searchParams = useSearchParams();
	const [result, setResult] = useState<ActionResult<string> | null>(null);
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, isValid },
	} = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: FieldValues) => {
		setResult(await resetPassword(data.password, searchParams.get("token")));
		reset({ password: "", confirmPassword: "" });
	};

	return (
		<CardWrapper
			headerIcon={GiPadlock}
			headerText="Reset password"
			subHeaderText="Enter your new password below"
			body={
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
					<TextInput
						control={control}
						name="password"
						label="Password"
						type="password"
					/>
					<TextInput
						control={control}
						name="confirmPassword"
						label="Confirm password"
						type="password"
					/>
					<Button
						type="submit"
						color="secondary"
						isLoading={isSubmitting}
						isDisabled={!isValid}
					>
						Reset password
					</Button>
				</form>
			}
			footer={result && <ResultMessage result={result} />}
		/>
	);
};
export default ResetPasswordForm;
