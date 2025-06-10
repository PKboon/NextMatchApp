"use client";

import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

import { createMessage } from "@/app/actions/messageActions";
import { TextInput } from "@/components/ui/TextInput";
import { MessageSchema, messageSchema } from "@/lib/schemas/messageSchema";
import { handleFormServerErrors } from "@/lib/util";

const ChatForm = () => {
	const router = useRouter();
	const params = useParams<{ userId: string }>();

	const {
		control,
		reset,
		handleSubmit,
		setError,
		setFocus,
		formState: { errors, isValid, isSubmitting },
	} = useForm<MessageSchema>({
		defaultValues: { text: "" },
		resolver: zodResolver(messageSchema),
		mode: "onSubmit",
	});

	const onSubmit = async (data: MessageSchema) => {
		const result = await createMessage(params.userId, data);

		if (result.status !== "success") {
			handleFormServerErrors(result, setError);
		} else {
			reset({ text: "" });
			router.refresh();
			setTimeout(() => setFocus("text"), 50);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<div className="flex items-center gap-2">
				<TextInput
					control={control}
					name="text"
					placeholder="Type a message"
					variant="faded"
					autoComplete="off"
				/>
				<Button
					isLoading={isSubmitting}
					isDisabled={!isValid || isSubmitting}
					color="secondary"
					type="submit"
					radius="full"
					isIconOnly
				>
					<HiPaperAirplane size={18} />
				</Button>
			</div>
			<div className="flex">
				{errors.root?.serverError && (
					<p className="text-danger text-sm">
						{errors.root.serverError.message}
					</p>
				)}
			</div>
		</form>
	);
};

export default ChatForm;
