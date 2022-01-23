import { ObjectID } from "bson";

type Post = TextPost | ImagePost;

export default Post;

type BasePost<T, D> = D & {
  type: T;
  createdAt: Date;
  text?: string;
  userID: ObjectID;
  likedBy: ObjectID[];
  comments: PostComment[];
};

export interface PostComment {
  userID: ObjectID;
  text: string;
  createdAt: Date;
}

type TextPost = BasePost<
  "text",
  {
    text: string;
  }
>;

type ImagePost = BasePost<
  "image",
  {
    image: string;
  }
>;
