import { Button, ButtonProps } from "@heroui/button";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { ReactNode } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	header?: string;
	body: ReactNode;
	footerButtons?: ButtonProps[];
	imageModal?: boolean;
};

const AppModal = ({
	isOpen,
	onClose,
	header,
	body,
	footerButtons,
	imageModal,
}: Props) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			placement="top-center"
			classNames={{
				base: `${imageModal ? "border-2 border-white" : ""}`,
				body: `${imageModal ? "p-0" : ""}`,
			}}
		>
			<ModalContent>
				{!imageModal && (
					<ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
				)}
				<ModalBody>{body}</ModalBody>
				{!imageModal && (
					<ModalFooter>
						{footerButtons &&
							footerButtons.map((props: ButtonProps, index) => (
								<Button {...props} key={index}>
									{props.children}
								</Button>
							))}
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};
export default AppModal;
