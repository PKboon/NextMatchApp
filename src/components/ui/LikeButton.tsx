import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiSpinner } from "react-icons/pi";

type Props = {
	isLoading: boolean;
	hasLiked: boolean;
	toggleLike: () => void;
};

const LikeButton = ({ isLoading, hasLiked, toggleLike }: Props) => {
	return (
		<>
			{isLoading ? (
				<PiSpinner size={32} className="fill-white animate-spin" />
			) : (
				<div
					onClick={toggleLike}
					className="relative hover:opacity-80 transition cursor-pointer"
				>
					<AiOutlineHeart
						size={28}
						className="fill-white absolute -top-[2px] -right-[2px]"
					/>
					<AiFillHeart
						size={24}
						className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
					/>
				</div>
			)}
		</>
	);
};
export default LikeButton;
