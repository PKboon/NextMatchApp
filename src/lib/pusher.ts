import PusherServer from "pusher";
import PusherClient from "pusher-js";

declare global {
	// eslint-disable-next-line no-var
	var pusherServerInstance: PusherServer | undefined;
	// eslint-disable-next-line no-var
	var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
	global.pusherServerInstance = new PusherServer({
		appId: process.env.PUSHER_APP_ID!,
		key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
		secret: process.env.PUSHER_SECRET!,
		cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
		useTLS: true,
	});
}

if (!global.pusherClientInstance) {
	global.pusherClientInstance = new PusherClient(
		process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
		{
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
		}
	);
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
