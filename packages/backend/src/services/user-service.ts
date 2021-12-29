import { Logger } from "tslog";
import UserRepository, { UserModel } from "../repositories/user-repository";

const logger = new Logger({ name: 'UserService'})

export default class UserService {

  constructor(
    private userRepository: UserRepository
  ) {}

  async getUser(): Promise<UserModel> {
    const user = await this.userRepository.findFirst()
    logger.debug(user)
    return user!
  }

}