import { SharedSelection } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { useShallow } from "zustand/shallow";

import useFilterStore from "./useFilterStore";
import usePaginationStore from "./usePagination";

export const useFilters = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const { filters, setFilters } = useFilterStore();
	const { ageRange, orderBy, gender } = filters;

	const { pageNumber, pageSize, setPage } = usePaginationStore(
		useShallow((state) => ({
			pageNumber: state.pagination.pageNumber,
			pageSize: state.pagination.pageSize,
			setPage: state.setPage,
		}))
	);

	const orderByList = [
		{ label: "Last active", key: "updated" },
		{ label: "Newest members", key: "created" },
	];

	const genderList = [
		{ value: "male", icon: FaMale },
		{ value: "female", icon: FaFemale },
	];

	useEffect(() => {
		if (gender || ageRange || orderBy) {
			setPage(1);
		}
	}, [ageRange, gender, orderBy, setPage]);

	useEffect(() => {
		startTransition(() => {
			const searchParams = new URLSearchParams();

			if (ageRange) searchParams.set("ageRange", ageRange.toString());
			if (orderBy) searchParams.set("orderBy", orderBy);
			if (gender) searchParams.set("gender", gender.join(","));

			if (pageSize) searchParams.set("pageSize", pageSize.toString());
			if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());

			router.replace(`${pathname}?${searchParams}`);
		});
	}, [ageRange, gender, orderBy, pageNumber, pageSize, pathname, router]);

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
