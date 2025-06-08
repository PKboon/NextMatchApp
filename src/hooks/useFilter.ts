import { SharedSelection } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { FaFemale, FaMale } from "react-icons/fa";

import useFilterStore from "./useFilterStore";

export const useFilters = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const { filters, setFilters } = useFilterStore();
	const { ageRange, orderBy, gender } = filters;

	const orderByList = [
		{ label: "Last active", key: "updated" },
		{ label: "Newest members", key: "created" },
	];

	const genderList = [
		{ value: "male", icon: FaMale },
		{ value: "female", icon: FaFemale },
	];

	useEffect(() => {
		startTransition(() => {
			const searchParams = new URLSearchParams();

			if (ageRange) searchParams.set("ageRange", ageRange.toString());
			if (orderBy) searchParams.set("orderBy", orderBy);
			if (gender) searchParams.set("gender", gender.join(","));

			router.replace(`${pathname}?${searchParams}`);
		});
	}, [ageRange, gender, orderBy, pathname, router]);

	const handleAgeSelect = (value: number[]) => {
		setFilters("ageRange", value);
	};

	const handleOrderSelect = (value: SharedSelection) => {
		if (!(value instanceof Set && value.values().next().value)) return;
		setFilters("orderBy", value.values().next().value as string);
	};

	const handleGenderSelect = (value: string) => {
		setFilters(
			"gender",
			gender.includes(value)
				? gender.filter((g) => g !== value)
				: [...gender, value]
		);
	};

	return {
		isPending,
		orderByList,
		genderList,
		filters,
		selectAge: handleAgeSelect,
		selectOrder: handleOrderSelect,
		selectGender: handleGenderSelect,
	};
};
