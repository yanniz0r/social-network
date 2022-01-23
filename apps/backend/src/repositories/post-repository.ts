import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Logger } from "tslog";
import Post, { PostComment } from "../types/post";
import { DistributiveOmit } from "../utils/distributive-omit";
const logger = new Logger({ name: "PostRepository" });

export type PostModel = WithId<Post>;

export type PostInput = DistributiveOmit<
  Post,
  "createdAt" | "likedBy" | "userID" | "comments"
>;

type CommentInput = Omit<PostComment, "createdAt">;

export default class PostRepository {
  private collection: Collection<Post>;

  constructor(db: Db) {
    this.collection = db.collection("posts");
  }

  async findAll() {
    return this.collection.find().sort({ createdAt: "desc" }).toArray();
  }

  async findPostById(id: ObjectId) {
    return this.collection.findOne({ _id: id });
  }

  async createPost(post: Post): Promise<ObjectId> {
    const { insertedId } = await this.collection.insertOne(post);
    return insertedId;
  }

  async addUserToLikedBy(userID: ObjectId, postID: ObjectId) {
    return this.collection.updateOne(
      {
        _id: postID,
      },
      {
        $push: {
          likedBy: userID,
        },
      }
    );
  }

  async removeUserFromLikedBy(userID: ObjectId, postID: ObjectId) {
    return this.collection.updateOne(
      {
        _id: postID,
      },
      {
        $pull: {
          likedBy: userID,
        },
      }
    );
  }

  async commentPost(postID: ObjectId, comment: CommentInput) {
    return this.collection.updateOne(
      {
        _id: postID,
      },
      {
        $push: {
          comments: {
            createdAt: new Date(),
            text: comment.text,
            userID: comment.userID,
          },
        },
      }
    );
  }
}
