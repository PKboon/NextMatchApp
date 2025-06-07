"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GiMatchTip } from "react-icons/gi";

import { registerUser } from "@/app/actions/authActions";
import { TextInput } from "@/components/ui/TextInput";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { handleFormServerErrors } from "@/lib/util";

const RegisterForm = () => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: RegisterSchema) => {
		const result = await registerUser(data);

		if (result.status === "success") {
			console.log("yay");
		} else {
			handleFormServerErrors(result, setError);
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<TextInput control={control} label="Name" name="name" />
						<TextInput control={control} label="Email" name="email" />
						<TextInput
							control={control}
							label="Password"
							name="password"
							type="password"
						/>
						{errors.root?.serverError && (
							<p className="text-danger text-sm">
								{errors.root.serverError.message}
							</p>
						)}
						<Button
							isLoading={isSubmitting}
							isDisabled={!isValid}
							fullWidth
							color="secondary"
							type="submit"
						>
							Register
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};
export default RegisterForm;
