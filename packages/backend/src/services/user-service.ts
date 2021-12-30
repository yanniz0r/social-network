import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import UserRepository, { UserModel } from "../repositories/user-repository";

const logger = new Logger({ name: "UserService" });

function initObjectID(id: ObjectId | string) {
  return typeof id === "string" ? new ObjectId(id) : id;
}

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(): Promise<UserModel> {
    const user = await this.userRepository.findFirst();
    logger.debug(user);
    return user!;
  }

  async findUser(id: ObjectId | string): Promise<UserModel | null> {
    logger.info("Find user", id);
    return this.userRepository.findUser(initObjectID(id));
  }

  async findUsers(ids: Array<ObjectId | string>) {
    logger.info("Find users", ids);
    return this.userRepository.findUsers(ids.map(initObjectID));
  }
}
