"use client";

import { usePathname } from "next/navigation";

import Filters from "./Filters";

const FiltersWrapper = () => {
	const pathname = usePathname();

	return pathname === "/members" ? <Filters /> : null;
};

export default FiltersWrapper;
