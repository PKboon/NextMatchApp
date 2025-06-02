import { Button } from "@heroui/button";

export default function Home() {
	return (
		<div>
			<div className="flex gap-4 items-center">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
			</div>
		</div>
	);
}
