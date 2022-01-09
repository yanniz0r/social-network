import { Logger } from "tslog";
import PostRepository, { PostModel } from "../repositories/post-repository";
import UserRepository from "../repositories/user-repository";

const logger = new Logger({ name: "AuthorizationService" });

export default class AuthorizationService {
  constructor(private userRepository: UserRepository) {}

  async ensureAuthorizedUser() {
    const authorizedUser = await this.userRepository.findFirst();
    return authorizedUser!;
  }
}
