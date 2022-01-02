import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Logger } from "tslog";
import Post from "../types/post";
import { DistributiveOmit } from "../utils/distributive-omit";
import { UserModel } from "./user-repository";

const logger = new Logger({ name: "PostRepository" });

export type PostModel = WithId<Post>;

export type PostInput = DistributiveOmit<Post, 'createdAt' | 'likedBy' | 'userID'>

export default class PostRepository {

  private collection: Collection<Post>;

  constructor(db: Db) {
    this.collection = db.collection("posts");
  }

  async findAll() {
    return this.collection.find().sort({ createdAt: 'desc' }).toArray();
  }

  async findPostById(id: ObjectId) {
    return this.collection.findOne({ _id: id })
  }

  async createPost(user: UserModel, input: PostInput): Promise<PostModel> {
    const post: Post = {
      ...input,
      createdAt: new Date(),
      userID: user._id,
      likedBy: [],
    }
    const { insertedId } = await this.collection.insertOne(post)
    logger.debug('Created post', insertedId)
    return {
      ...post,
      _id: insertedId,
    }
  }

  async addUserToLikedBy(userID: ObjectId, postID: ObjectId) {
    return this.collection.updateOne({
      _id: postID,
    }, {
      $push: {
        likedBy: userID
      }
    })
  }

  async removeUserFromLikedBy(userID: ObjectId, postID: ObjectId) {
    return this.collection.updateOne({
      _id: postID,
    }, {
      $pull: {
        likedBy: userID
      }
    })
  }

}
