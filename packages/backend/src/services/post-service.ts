import { Logger } from "tslog";
import PostRepository, { PostModel } from "../repositories/post-repository";

const logger = new Logger({ name: "UserService" });

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async getPosts(): Promise<PostModel[]> {
    const posts = await this.postRepository.findAll();
    logger.debug(posts);
    return posts;
  }
}
