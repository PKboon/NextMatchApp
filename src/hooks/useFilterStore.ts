import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserFilters } from "@/types";

type FilterState = {
	filters: UserFilters;
	setFilters: (
		filterName: keyof FilterState["filters"],
		value: string | string[] | number[]
	) => void;
};

const useFilterStore = create<FilterState>()(
	devtools(
		(set) => ({
			filters: {
				ageRange: [18, 100],
				gender: ["male", "female"],
				orderBy: "updated",
			},
			setFilters: (filterName, value) =>
				set((state) => {
					return {
						filters: {
							...state.filters,
							[filterName]: value,
						},
					};
				}),
		}),
		{ name: "FilterStore" }
	)
);

export default useFilterStore;
