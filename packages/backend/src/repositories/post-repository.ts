import { Collection, Db, WithId } from "mongodb";
import { Logger } from "tslog";
import Post from "../types/post";

const logger = new Logger({ name: 'PostRepository' })

export type PostModel = WithId<Post>

export default class PostRepository {

  private collection: Collection<Post>

  constructor(db: Db) {
    this.collection = db.collection('posts')
  }

  async findAll() {
    return this.collection.find().sort('createdAt', 1).toArray()
  }

}