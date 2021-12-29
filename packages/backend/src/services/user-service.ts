import { WithId } from "mongodb";
import { Logger } from "tslog";
import UserRepository from "../repositories/user-respository";
import User from "../types/user";

const logger = new Logger({ name: 'UserService'})

export type UserModel = WithId<User>

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