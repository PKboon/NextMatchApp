"use client";

import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import clsx from "clsx";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import usePaginationStore from "@/hooks/usePagination";

const PaginationComponent = ({
	hasMembers,
	totalCount,
}: {
	hasMembers: boolean;
	totalCount: number;
}) => {
	const { pagination, setPage, setPageSize, setPagination } =
		usePaginationStore(
			useShallow((state) => ({
				pagination: state.pagination,
				setPage: state.setPage,
				setPageSize: state.setPageSize,
				setPagination: state.setPagination,
			}))
		);

	const { pageNumber, pageSize, totalPages } = pagination;

	useEffect(() => {
		setPagination(totalCount);
	}, [setPagination, totalCount]);

	const start = (pageNumber - 1) * pageSize + 1;
	const end = Math.min(pageNumber * pageSize, totalCount);
	const resultText = `Showing ${start}-${end} of ${totalCount} results`;

	if (!hasMembers) return null;

	return (
		<div className="border-t-2 w-full mt-5">
			<div className="flex justify-between items-center py-5">
				<div>{resultText}</div>
				<Pagination
					total={totalPages}
					page={pageNumber}
					onChange={setPage}
					color="secondary"
					variant="bordered"
					className="cursor-pointer"
				/>
				<div className="flex gap-1 items-center">
					Page size:
					<div>
						{[3, 6, 12].map((size) => (
							<Button
								key={size}
								color={pageSize === size ? "secondary" : "default"}
								variant={pageSize === size ? "solid" : "bordered"}
								className={clsx(
									"min-w-9 max-w-9 h-9 mx-0.5 border-2 rounded-xl",
									{
										"hover:bg-neutral-100": pageSize !== size,
										"border-2 border-purple-700": pageSize === size,
									}
								)}
								onPress={() => setPageSize(size)}
							>
								{size}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default PaginationComponent;
