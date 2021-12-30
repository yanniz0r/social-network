import { FC } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface LikeButtonProps {
  liked?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ liked }) => {
  let buttonClasses = "flex items-center rounded-lg px-4 py-2 bg-opacity-10 ";
  if (liked) {
    buttonClasses += "bg-green-400 text-green-400";
  } else {
    buttonClasses += "bg-blue-400 text-blue-400";
  }
  return (
    <button className={buttonClasses}>
      <FaThumbsUp />
      <span className="ml-2">Gefällt {liked ? "dir" : "mir"}</span>
    </button>
  );
};

export default LikeButton;
