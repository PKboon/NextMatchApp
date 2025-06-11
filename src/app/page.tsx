import { auth } from "@/auth";
import ClientSession from "@/components/ClientSession";

export default async function Home() {
	const session = await auth();
	return (
		<div className="flex justify-around mt-20 gap-6">
			<div className="bg-green-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
				<strong>Server session data</strong>

				{session && <pre>{JSON.stringify(session, null, 2)}</pre>}
			</div>
			<ClientSession />
		</div>
	);
}
