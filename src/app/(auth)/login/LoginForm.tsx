"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

import { TextInput } from "@/components/ui/TextInput";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";

const LoginForm = () => {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onTouched",
	});

	const onSubmit = (data: LoginSchema) => {
		console.log(data);
	};

	return (
		<Card className="w-2/5 mx-auto">
			<CardHeader className="flex flex-col items-center justify-center">
				<div className="flex flex-col gap-2 items-center text-secondary">
					<div className="flex flex-row items-center gap-3">
						<GiPadlock size={30} />
						<h1 className="text-3xl font-semibold">Log In</h1>
					</div>
					<p className="text-neutral-500">Welcome back to NextMatch</p>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<TextInput control={control} label="Email" name="email" />
						<TextInput
							control={control}
							label="Password"
							name="password"
							type="password"
						/>
						<Button
							isDisabled={!isValid}
							fullWidth
							color="secondary"
							type="submit"
						>
							Log In
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};
export default LoginForm;
