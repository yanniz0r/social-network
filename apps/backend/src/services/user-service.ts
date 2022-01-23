import { FileUpload } from "graphql-upload";
import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import UserRepository, {
  FriendshipModel,
  UserModel,
} from "../repositories/user-repository";
import initObjectID from "../utils/init-object-id";
import FileStorageService from "./file-storage-service";
import * as uuid from "uuid";
import User from "../types/user";

const logger = new Logger({ name: "UserService" });

export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private fileStorageService: FileStorageService
  ) {}

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
    const friendships =
      await this.userRepository.findEstablishedFriendshipsForUser(
        initObjectID(id)
      );
    const friendIDs = friendships.map((friendship) => {
      if (friendship.receiver.equals(id)) {
        return friendship.requester;
      } else {
        return friendship.receiver;
      }
    });
    const loadedUsers = await this.userRepository.findUsers(friendIDs);
    const users = loadedUsers.filter((user): user is UserModel => {
      return Boolean(user) && !(user instanceof Error);
    });
    return users;
  }

  async findFriendshipRequestsForUser(
    id: ObjectId | string
  ): Promise<FriendshipModel[]> {
    const unestablishedFriendships = await this.userRepository.findUnestablishedFriendshipsForUser(
      initObjectID(id)
    );
    return unestablishedFriendships.filter(friendship => friendship.receiver.equals(id))
  }

  async findFriendship(id: ObjectId | string) {
    return this.userRepository.findFriendship(initObjectID(id));
  }

  async findFriendshipBetween(requester: ObjectId | string, receiver: ObjectId | string): Promise<FriendshipModel | null> {
    const receiverId = initObjectID(receiver)
    const requesterFriendships = await this.userRepository.findFriendshipsForUser(initObjectID(requester))
    const friendship = requesterFriendships.find(friendship => {
      return friendship.receiver.equals(receiverId) || friendship.requester.equals(receiverId)
    })
    return friendship ?? null
  }

  async acceptFriendshipRequest(id: ObjectId | string) {
    await this.userRepository.updateFriendship(initObjectID(id), {
      acceptedAt: new Date(),
    });
  }

  async getFriendRecommendations(id: ObjectId | string) {
    const userId = initObjectID(id)
    const friends = await this.findFriendsForUser(userId)
    
    const friendLayers = [friends]
    const maxFriendLayers = 3
    
    for (let friendLayer = 1; friendLayer < maxFriendLayers; friendLayer++) {
      const previousLayer = friendLayers[friendLayer - 1]
      const friendLists = await Promise.all(
        previousLayer.map(user => this.findFriendsForUser(user._id))
      )
      const friendsOfFriends = friendLists.flat()
      friendLayers[friendLayer] = Array.from(new Set(friendsOfFriends))
    }

    return Array.from(new Set(friendLayers.flat())).filter(user => {
      return user._id !== userId && !friends.some(friend => friend._id === user._id)
    })
  }

  async setAvatar(id: ObjectId | string, avatar: FileUpload) {
    const avatarStream = avatar.createReadStream();
    const fileName = uuid.v4();
    await this.fileStorageService.uploadStream(
      "avatar",
      fileName,
      avatarStream
    );
    await this.userRepository.updateUser(initObjectID(id), {
      avatar: fileName,
    });
  }

  createUser(user: Omit<User, 'createdAt'>) {
    return this.userRepository.createUser({
      createdAt: new Date(),
      ...user
    })
  }

  searchUsers(query: string): Promise<UserModel[]> {
    return this.userRepository.searchUsers(query)
  }

  createFriendship(requester: UserModel, receiver: UserModel) {
    return this.userRepository.createFriendship({
      requester: requester._id,
      receiver: receiver._id,
      createdAt: new Date(),
    })
  }

  findUserByGoogleID(id: string) {
    return this.userRepository.findUserWithMatchingAuth({
      google: {
        id,
      }
    })
  }

}
