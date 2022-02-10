import { FC } from "react";
import { FaThumbsUp } from "react-icons/fa";
import {
  useLikeButtonLikeMutation,
  useLikeButtonUnlikeMutation,
} from "../graphql/generated";
import Button from "./button";

interface LikeButtonProps {
  postID: string;
  liked?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ liked, postID }) => {
  const [likePost] = useLikeButtonLikeMutation();
  const [unlikePost] = useLikeButtonUnlikeMutation();

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
          postID: postID,
        },
      });
    } else {
      await likePost({
        variables: {
          postID: postID,
        },
      });
    }
  }

  return (
    <Button onClick={toggleLike} iconStart={<FaThumbsUp />}>
      Gefällt {liked ? "dir" : "mir"}
    </Button>
  );
};

export default LikeButton;
