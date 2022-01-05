import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import { TextPostInput } from "../graphql/generated";
import PostRepository, { PostInput, PostModel } from "../repositories/post-repository";
import { UserModel } from "../repositories/user-repository";
import Post from "../types/post";
import initObjectID from "../utils/init-object-id";

const logger = new Logger({ name: "PostService" });

export default class PostService {

  constructor(private postRepository: PostRepository) {}

  async getPosts(): Promise<PostModel[]> {
    const posts = await this.postRepository.findAll();
    logger.debug(posts);
    return posts;
  }

  async createTextPost(user: UserModel, input: TextPostInput) {
    const textPostInput: PostInput = {
      type: 'text',
      text: input.text,
    }
    return this.postRepository.createPost(user, textPostInput)
  }

  async getPostByID(id: string | ObjectId) {
    return this.postRepository.findPostById(initObjectID(id))
  }

  async likePost(user: UserModel, post: PostModel) {
    return this.postRepository.addUserToLikedBy(user._id, post._id)
  }

  async unlikePost(user: UserModel, post: PostModel) {
    return this.postRepository.removeUserFromLikedBy(user._id, post._id)
  }

}
