import { ObjectID } from "bson";
import DataLoader from "dataloader";
import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Logger } from "tslog";
import FriendshipDataloader from "../dataloader/friendship-dataloader";
import Friendship from "../types/friendship";
import User from "../types/user";

const logger = new Logger({ name: "UserRepository" });

export type UserModel = WithId<User>;
export type FriendshipModel = WithId<Friendship>;

export default class UserRepository {
  private userCollection: Collection<User>;
  private friendshipCollection: Collection<Friendship>;

  private findUserDataloader = new DataLoader<ObjectId, UserModel | null>(
    async (keys) => {
      const users = await this.userCollection
        .find({
          _id: {
            $in: keys,
          },
        })
        .toArray();

      logger.debug("Loading users", keys);

      return keys.map((key) => {
        const value = users.find((user) => user._id.equals(key));
        return value ?? null;
      });
    }
  );

  private findEstablishedFriendshipsDataloader: FriendshipDataloader
  private findUnestablishedFriendshipsDataloader: FriendshipDataloader

  constructor(db: Db) {
    this.userCollection = db.collection("users");
    this.friendshipCollection = db.collection("friendships");
    this.findEstablishedFriendshipsDataloader = new FriendshipDataloader(this.friendshipCollection, true)
    this.findUnestablishedFriendshipsDataloader = new FriendshipDataloader(this.friendshipCollection, false)
  }

  async findFirst() {
    return await this.userCollection.findOne()!;
  }

  async findUser(id: ObjectId) {
    return this.findUserDataloader.load(id);
  }

  async findEstablishedFriendshipsForUser(id: ObjectId) {
    return this.findEstablishedFriendshipsDataloader.load(id);
  }

  async findUnestablishedFriendshipsForUser(id: ObjectId) {
    return this.findUnestablishedFriendshipsDataloader.load(id);
  }

  async findUsers(objectIDs: Array<ObjectID>) {
    return this.findUserDataloader.loadMany(objectIDs);
  }

  async findFriendship(id: ObjectID) {
    return this.friendshipCollection.findOne({
      _id: id
    })
  }

  async updateFriendship(id: ObjectID, friendship: Partial<Friendship>) {
    return this.friendshipCollection.updateOne({
      _id: id
    }, {
      $set: {
        ...friendship
      }
    })
  }
}
