import { Logger } from "tslog";
import { TextPostInput } from "../graphql/generated";
import PostRepository, { PostInput, PostModel } from "../repositories/post-repository";
import { UserModel } from "../repositories/user-repository";

const logger = new Logger({ name: "UserService" });

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
}
