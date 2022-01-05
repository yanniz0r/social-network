import { formatDistance, formatRelative } from "date-fns";
import { FC } from "react";
import { Post, User } from "../graphql/generated";
import LikeButton from "./like-button";

interface PostCardProps {
  post: Pick<Post, "id" | "text" | "createdAt" | "liked"> & {
    user: Pick<User, "name">;
    likedBy: Pick<User, "firstName" | "id">[];
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const createdAt = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
  })
  return (
    <div className="bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <div className="p-5 flex">
        <div className="flex items-center justify-center w-14 h-14 bg-red-500 font-bold text-white text-xl rounded-full">
          {post.user.name[0]}
        </div>
        <div className="ml-4">
          <h4 className="text-xl dark:text-gray-200">{post.user.name}</h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {createdAt}
          </span>
        </div>
      </div>
      <div className="px-5 pb-5">
        <p className="text-lg dark:text-white">{post.text}</p>
      </div>
      <div className="px-5 pb-5">
        {post.likedBy.length > 0 && (
          <div className="mb-2 dark:text-gray-400">
            Gefällt
            {post.likedBy.map((likedBy, index) => (
              <span key={likedBy.id}>
                <span> </span>
                <a href="" className="text-green-400">
                  {likedBy.firstName}
                </a>
                {index !== post.likedBy.length - 1 && <span>, </span>}
              </span>
            ))}
          </div>
        )}
        <LikeButton postID={post.id} liked={post.liked} />
      </div>
    </div>
  );
};

export default PostCard;
