import { useSession } from "next-auth/react";

export const useRole = () => {
	const session = useSession();

	return { role: session.data?.user.role };
};
