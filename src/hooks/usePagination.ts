import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { PagingResult } from "@/types";

type PaginationState = {
	pagination: PagingResult;
	setPagination: (count: number) => void;
	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
};

const usePaginationStore = create<PaginationState>()(
	devtools(
		(set) => ({
			pagination: {
				pageNumber: 1,
				pageSize: 12,
				totalCount: 0,
				totalPages: 1,
			},
			setPagination: (totalCount: number) =>
				set((state) => ({
					pagination: {
						pageNumber: 1,
						pageSize: state.pagination.pageSize,
						totalCount,
						totalPages: Math.ceil(totalCount / state.pagination.pageSize),
					},
				})),
			setPage: (page: number) =>
				set((state) => ({
					pagination: {
						...state.pagination,
						pageNumber: page,
					},
				})),
			setPageSize: (pageSize: number) =>
				set((state) => ({
					pagination: {
						...state.pagination,
						pageNumber: 1,
						pageSize,
						totalPages: Math.ceil(state.pagination.totalCount / pageSize),
					},
				})),
		}),
		{ name: "paginationStore" }
	)
);

export default usePaginationStore;
