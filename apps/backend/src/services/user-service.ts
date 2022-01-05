import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import UserRepository, { FriendshipModel, UserModel } from "../repositories/user-repository";
import initObjectID from "../utils/init-object-id";

const logger = new Logger({ name: "UserService" });

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

  async findFriendsForUser(id: ObjectId | string): Promise<UserModel[]> {
    const friendships = await this.userRepository.findEstablishedFriendshipsForUser(initObjectID(id))
    const friendIDs = friendships.map(friendship => {
      if (friendship.receiver.equals(id)) {
        return friendship.requester
      } else {
        return friendship.receiver
      }
    })
    const loadedUsers = await this.userRepository.findUsers(friendIDs)
    const users = loadedUsers.filter((user): user is UserModel => {
      return Boolean(user) && !(user instanceof Error)
    })
    return users
  }

  async findFriendshipRequestsForUser(id: ObjectId | string): Promise<FriendshipModel[]> {
    return this.userRepository.findUnestablishedFriendshipsForUser(initObjectID(id))
  }
}
