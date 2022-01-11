import { format, formatDistance } from "date-fns";
import { FC, useState } from "react";
import { FaComment } from "react-icons/fa";
import {
  Post,
  User,
  Comment,
  usePostCardCommentPostMutation,
} from "../graphql/generated";
import Avatar from "./avatar";
import IconButton from "./icon-button";
import LikeButton from "./like-button";
import RichText from "./rich-text";
import Tooltip from "./tooltip";

interface PostCardProps {
  me: Pick<User, "id" | "name" | "online">;
  post: Pick<Post, "id" | "text" | "createdAt" | "liked"> & {
    user: Pick<User, "name">;
    likedBy: Pick<User, "firstName" | "id">[];
    comments: Array<
      Pick<Comment, "text" | "createdAt"> & {
        user: Pick<User, "id" | "name" | "online">;
      }
    >;
  } & (
      | { __typename: "ImagePost"; imageURL: string }
      | { __typename: "TextPost" }
    );
}

const PostCard: FC<PostCardProps> = ({ post, me }) => {
  const [comment, setComment] = useState("");
  const [commentPostMutation] = usePostCardCommentPostMutation();
  const createdAt = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
  });

  function createComment() {
    if (!comment) return;
    commentPostMutation({
      variables: {
        postID: post.id,
        text: comment,
      },
      optimisticResponse() {
        return {
          __typename: "Mutation",
          commentPost: {
            __typename: "TextPost",
            id: post.id,
            comments: [
              ...post.comments,
              {
                createdAt: new Date().toISOString(),
                text: comment,
                user: {
                  ...me,
                },
              },
            ],
          },
        };
      },
    });
    setComment("");
  }

  return (
    <div className="bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <div className="p-5 flex">
        <div className="flex items-center justify-center w-14 h-14 bg-red-500 font-bold text-white text-xl rounded-full">
          {post.user.name[0]}
        </div>
        <div className="ml-4">
          <h4 className="text-xl dark:text-gray-200">{post.user.name}</h4>
          <Tooltip text={format(new Date(post.createdAt), 'dd.MM.yyyy, HH:mm')}>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {createdAt}
            </span>
          </Tooltip>
        </div>
      </div>
      {post.text && (
        <div className="px-5 pb-5">
          <p className="text-lg dark:text-white">
            <RichText text={post.text} />
          </p>
        </div>
      )}
      {post.__typename === "ImagePost" && (
        <div className="mb-5">
          <img src={post.imageURL} />
        </div>
      )}
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
      <div className="px-5 pb-5">
        {post.comments.map((comment) => (
          <div className="flex mt-4">
            <Avatar
              size="md"
              name={comment.user.name}
              online={comment.user.online}
            />
            <div className="ml-2">
              <h4 className="text-lg dark:text-white">
                {comment.user.name}{" "}
                <small className="dark:text-gray-400">
                  {formatDistance(new Date(comment.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </small>
              </h4>
              <p className="text-md dark:text-gray-300">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <div className="flex">
          <textarea
            className="flex-grow dark:bg-gray-700 rounded-lg p-2 dark:text-gray-100"
            rows={1}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          {/* <button className="px-4 py-2 bg-">Kommentieren</button> */}
          <div className="ml-2">
            <IconButton onClick={createComment}>
              <FaComment />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
