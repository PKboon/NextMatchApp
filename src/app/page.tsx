import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";

export default function Home() {
	return (
		<div>
			<div className="flex gap-4 items-center">
				<Button size="sm">Small</Button>

				<Avatar
					size="md"
					src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
				/>
				<Avatar
					size="lg"
					src="https://i.pravatar.cc/150?u=a04258114e29026302d"
				/>
				<Avatar
					className="w-20 h-20 text-large"
					src="https://i.pravatar.cc/150?u=a04258114e29026708c"
				/>
			</div>
		</div>
	);
}
