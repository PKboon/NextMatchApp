"use client";

import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import clsx from "clsx";
import { useState } from "react";

const PaginationComponent = () => {
	const [active, setActive] = useState(3);

	return (
		<div className="border-t-2 w-full mt-5">
			<div className="flex justify-between items-center py-5">
				<div>Showing 1-10 of 23 results</div>
				<Pagination
					total={20}
					color="secondary"
					initialPage={1}
					variant="bordered"
					className="cursor-pointer"
				/>
				<div className="flex gap-1 items-center">
					Page size:
					<div>
						{[3, 6, 12].map((size) => (
							<Button
								key={size}
								color={active === size ? "secondary" : "default"}
								variant={active === size ? "solid" : "bordered"}
								className={clsx(
									"min-w-9 max-w-9 h-9 mx-0.5 border-2 rounded-xl",
									{
										"hover:bg-neutral-100": active !== size,
										"border-2 border-purple-700": active === size,
									}
								)}
								onPress={() => setActive(size)}
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
