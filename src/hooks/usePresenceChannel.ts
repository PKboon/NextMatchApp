import { Channel, Members } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

import { updateLastActive } from "@/app/actions/memberActions";
import { pusherClient } from "@/lib/pusher";

import usePresenceStore from "./usePresenceStore";

export const usePresenceChannel = (
	userId: string | null,
	profileComplete: boolean
) => {
	const { set, add, remove } = usePresenceStore(
		useShallow((state) => ({
			set: state.set,
			add: state.add,
			remove: state.remove,
		}))
	);
	const channelRef = useRef<Channel | null>(null);

	const handleSetMembers = useCallback(
		(memberIds: string[]) => {
			set(memberIds);
		},
		[set]
	);

	const handleAddMember = useCallback(
		(memberId: string) => {
			add(memberId);
		},
		[add]
	);

	const handleRemoveMember = useCallback(
		(memberId: string) => {
			remove(memberId);
		},
		[remove]
	);

	useEffect(() => {
		if (!userId || !profileComplete) return;

		if (!channelRef.current) {
			channelRef.current = pusherClient.subscribe("presence-next-match");

			channelRef.current.bind(
				"pusher:subscription_succeeded",
				async (members: Members) => {
					handleSetMembers(Object.keys(members.members));
					await updateLastActive();
				}
			);

			channelRef.current.bind(
				"pusher:member_added",
				(member: { id: string }) => {
					handleAddMember(member.id);
				}
			);

			channelRef.current.bind(
				"pusher:member_removed",
				(member: { id: string }) => {
					handleRemoveMember(member.id);
				}
			);
		}

		return () => {
			if (channelRef.current && channelRef.current.subscribed) {
				channelRef.current.unsubscribe();
				channelRef.current.unbind_all();
				channelRef.current = null;
			}
		};
	}, [
		handleAddMember,
		handleRemoveMember,
		handleSetMembers,
		profileComplete,
		userId,
	]);
};
