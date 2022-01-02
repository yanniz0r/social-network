import { FC } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useLikeButtonLikeMutation, useLikeButtonUnlikeMutation } from "../graphql/generated";

interface LikeButtonProps {
  postID: string;
  liked?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ liked, postID }) => {
  const [likePost] = useLikeButtonLikeMutation()
  const [unlikePost] = useLikeButtonUnlikeMutation()

  let buttonClasses = "flex items-center rounded-lg px-4 py-2 bg-opacity-10 ";
  if (liked) {
    buttonClasses += "bg-green-400 text-green-400";
  } else {
    buttonClasses += "bg-blue-400 text-blue-400";
  }

  async function toggleLike() {
    if (liked) {
      await unlikePost({
        variables: {
          postID: postID
        }
      })
    } else {
      await likePost({
        variables: {
          postID: postID
        }
      })
    }
  }

  return (
    <button className={buttonClasses} onClick={toggleLike}>
      <FaThumbsUp />
      <span className="ml-2">Gefällt {liked ? "dir" : "mir"}</span>
    </button>
  );
};

export default LikeButton;
