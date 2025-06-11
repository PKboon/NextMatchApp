"use client";

import { Spinner } from "@heroui/spinner";
import { Tab, Tabs } from "@heroui/tabs";
import { Key } from "@react-types/shared";
import { Member } from "generated";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import LoadingComponent from "@/components/LoadingComponent";

import MemberCard from "../members/MemberCard";

type Props = {
	members: Member[];
	likeIds: string[];
};

const ListTab = ({ members, likeIds }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const tabs = [
		{ id: "source", label: "Members I have liked" },
		{ id: "target", label: "Members that like me" },
		{ id: "mutual", label: "Mutaul likes" },
	];

	function handleTabChange(key: Key): void {
		startTransition(() => {
			const params = new URLSearchParams(searchParams);
			params.set("type", key.toString());
			router.replace(`${pathname}?${params.toString()}`);
		});
	}

	return (
		<div className="flex w-full flex-col mt-10 gap-5 relative">
			<Tabs
				aria-label="Like tabs"
				items={tabs}
				color="secondary"
				onSelectionChange={(key) => handleTabChange(key)}
			>
				{(item) => (
					<Tab key={item.id} title={item.label}>
						{members.length > 0 && !isPending ? (
							<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
								{members.map((member) => (
									<MemberCard
										key={member.id}
										member={member}
										likeIds={likeIds}
									/>
								))}
							</div>
						) : (
							<div>No members for this filter</div>
						)}
					</Tab>
				)}
			</Tabs>
			{isPending && (
				<Spinner
					color="secondary"
					className="absolute left-[460px] top-[4px]"
				/>
			)}
		</div>
	);
};
export default ListTab;
