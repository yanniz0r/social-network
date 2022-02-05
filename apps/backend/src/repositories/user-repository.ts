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

  private findUserDataloader = new DataLoader<
    ObjectId,
    UserModel | null,
    string
  >(
    async (keys) => {
      const users = await this.userCollection
        .find({
          _id: {
            $in: keys,
          },
        })
        .toArray();

      return keys.map((key) => {
        const value = users.find((user) => user._id.equals(key));
        return value ?? null;
      });
    },
    {
      cacheKeyFn(key) {
        return key.toString();
      },
    }
  );

  private findFriendshipsDataloader: FriendshipDataloader;

  constructor(db: Db) {
    this.userCollection = db.collection("users");
    this.friendshipCollection = db.collection("friendships");
    this.findFriendshipsDataloader = new FriendshipDataloader(
      this.friendshipCollection
    );
  }

  async findFirst() {
    return await this.userCollection.findOne()!;
  }

  async findUser(id: ObjectId) {
    return this.findUserDataloader.load(id);
  }

  async findEstablishedFriendshipsForUser(id: ObjectId) {
    return this.findFriendshipsDataloader.loadEstablished(id);
  }

  async findFriendshipsForUser(id: ObjectId) {
    return this.findFriendshipsDataloader.load(id);
  }

  async findUnestablishedFriendshipsForUser(id: ObjectId) {
    return this.findFriendshipsDataloader.loadUnestablished(id);
  }

  async findUsers(objectIDs: Array<ObjectID>) {
    return this.findUserDataloader.loadMany(objectIDs);
  }

  async findFriendship(id: ObjectID) {
    return this.friendshipCollection.findOne({
      _id: id,
    });
  }

  async searchUsers(query: string) {
    return this.userCollection
      .find({
        $or: [
          {
            firstName: {
              $regex: `.*${query}.*`,
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: `.*${query}.*`,
              $options: "i",
            },
          },
        ],
      })
      .toArray();
  }

  async updateFriendship(id: ObjectID, friendship: Partial<Friendship>) {
    return this.friendshipCollection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...friendship,
        },
      }
    );
  }

  async createUser(user: User): Promise<UserModel> {
    const { insertedId } = await this.userCollection.insertOne(user);
    return {
      _id: insertedId,
      ...user,
    };
  }

  async createFriendship(friendship: Friendship): Promise<FriendshipModel> {
    const { insertedId } = await this.friendshipCollection.insertOne(
      friendship
    );
    return {
      _id: insertedId,
      ...friendship,
    };
  }

  async updateUser(id: ObjectID, user: Partial<User>) {
    return this.userCollection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...user,
          updatedAt: new Date(),
        },
      }
    );
  }

  async findUserWithMatchingAuth(auth: Partial<User["auth"]>) {
    return this.userCollection.findOne({
      auth,
    });
  }
}
