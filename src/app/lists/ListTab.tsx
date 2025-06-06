"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { Key } from "@react-types/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Member } from "@/generated/prisma";

import MemberCard from "../members/MemberCard";

type Props = {
	members: Member[];
	likeIds: string[];
};

const ListTab = ({ members, likeIds }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const tabs = [
		{ id: "source", label: "Members I have liked" },
		{ id: "target", label: "Members that like me" },
		{ id: "mutual", label: "Mutaul likes" },
	];

	function handleTabChange(key: Key): void {
		const params = new URLSearchParams(searchParams);
		params.set("type", key.toString());
		router.replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="flex w-full flex-col mt-10 gap-5">
			<Tabs
				aria-label="Like tabs"
				items={tabs}
				color="secondary"
				onSelectionChange={(key) => handleTabChange(key)}
			>
				{(item) => (
					<Tab key={item.id} title={item.label}>
						{members.length > 0 ? (
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
		</div>
	);
};
export default ListTab;
