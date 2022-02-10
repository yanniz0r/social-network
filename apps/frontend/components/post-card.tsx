import { format, formatDistance } from "date-fns";
import Link from "next/link";
import { FC, useState } from "react";
import { FaComment } from "react-icons/fa";
import {
  Post,
  User,
  Comment,
  usePostCardCommentPostMutation,
} from "../graphql/generated";
import Avatar from "./avatar";
import Card from "./card";
import IconButton from "./icon-button";
import LikeButton from "./like-button";
import RichText from "./rich-text";
import Tooltip from "./tooltip";

interface PostCardProps {
  me: Pick<User, "id" | "name" | "online">;
  post: Pick<Post, "id" | "text" | "createdAt" | "liked"> & {
    user: Pick<User, "name" | "avatarURL" | "online" | "id">;
    likedBy: Pick<User, "firstName" | "id">[];
    comments: Array<
      Pick<Comment, "text" | "createdAt"> & {
        user: Pick<User, "id" | "name" | "online" | "avatarURL">;
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
    <Card>
      <div className="p-5">
        <Link passHref href={`/profile/${post.user.id}`}>
          <a className="flex items-center">
            <Avatar
              size="lg"
              name={post.user.name}
              online={post.user.online}
              imageURL={post.user.avatarURL ?? undefined}
            />
            <div className="ml-4">
              <h4 className="text-xl dark:text-slate-200">{post.user.name}</h4>
              <Tooltip
                text={format(new Date(post.createdAt), "dd.MM.yyyy, HH:mm")}
              >
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {createdAt}
                </span>
              </Tooltip>
            </div>
          </a>
        </Link>
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
          <div className="mb-2 dark:text-slate-400">
            Gefällt
            {post.likedBy.map((likedBy, index) => (
              <span key={likedBy.id}>
                <span> </span>
                <a href={`/profile/${likedBy.id}`} className="text-blue-500">
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
          <div className="flex mt-4" key={comment.createdAt}>
            <Avatar
              size="md"
              name={comment.user.name}
              imageURL={comment.user.avatarURL ?? undefined}
              online={comment.user.online}
            />
            <div className="ml-2">
              <h4 className="text-lg dark:text-white">
                {comment.user.name}{" "}
                <small className="dark:text-slate-400">
                  {formatDistance(new Date(comment.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </small>
              </h4>
              <p className="text-md dark:text-slate-300">
                <RichText text={comment.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <div className="flex">
          <textarea
            placeholder="Kommentiere diesen Beitrag"
            className="flex-grow dark:bg-slate-700 rounded-lg p-2 dark:text-slate-100"
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
    </Card>
  );
};

export default PostCard;
