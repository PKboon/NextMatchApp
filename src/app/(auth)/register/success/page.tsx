"use client";

import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

import CardWrapper from "@/components/CardWrapper";

const RegisterSuccessPage = () => {
	const router = useRouter();

	return (
		<CardWrapper
			headerText="You have successfully registered"
			headerIcon={FaCheckCircle}
			subHeaderText="Please verify your email (it might be in your spam box)"
			action={() => router.push("/login")}
			actionLabel="Go to login"
		/>
	);
};
export default RegisterSuccessPage;
