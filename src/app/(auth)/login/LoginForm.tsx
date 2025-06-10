"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

import { signInUser } from "@/app/actions/authActions";
import { TextInput } from "@/components/ui/TextInput";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { handleFormServerErrors } from "@/lib/util";

import SocialLogin from "./SocialLogin";

const LoginForm = () => {
	const router = useRouter();

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: LoginSchema) => {
		const result = await signInUser(data);

		if (result.status === "success") {
			router.push("/members");
			router.refresh();
		} else {
			handleFormServerErrors(result, setError);
		}
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
							Log In
						</Button>
						<Divider />
						<SocialLogin />
						<div className="felx justify-center hover:underline text-sm text-center">
							<Link href="/forgot-password">Forgot password?</Link>
						</div>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};
export default LoginForm;
