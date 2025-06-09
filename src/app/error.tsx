//https://nextjs.org/docs/app/api-reference/file-conventions/error
"use client";

import { BiSolidError } from "react-icons/bi";

import CardWrapper from "@/components/CardWrapper";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<CardWrapper
			body={
				<div className="flex justify-center text-danger">{error.message}</div>
			}
			headerIcon={BiSolidError}
			headerText="Error"
			action={() => reset()}
			actionLabel="Try again"
		/>
	);
}
