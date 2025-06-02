"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default Providers;
