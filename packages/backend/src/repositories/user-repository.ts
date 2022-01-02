import { ObjectID } from "bson";
import DataLoader from "dataloader";
import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Logger } from "tslog";
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

  private findEstablishedFriendshipsDataloader = new DataLoader<ObjectId, FriendshipModel[]>(
    async (keys) => {
      const friendships = await this.friendshipCollection.find({
        acceptedAt: {
          $exists: true
        },
        $or: [
          {
            receiver: {
              $in: keys
            }
          },
          {
            requester: {
              $in: keys
            }
          },
        ]
      }).toArray()
      
      return keys.map(userID => {
        const matchingFriendships = friendships.filter(friendship => {
          return friendship.requester.equals(userID) || friendship.receiver.equals(userID)
        })
        return matchingFriendships
      })
    }
  );


  constructor(db: Db) {
    this.userCollection = db.collection("users");
    this.friendshipCollection = db.collection("friendships");
  }

  async findFirst() {
    return await this.userCollection.findOne()!;
  }

  async findUser(id: ObjectId) {
    return this.findUserDataloader.load(id);
  }

  async findFriendshipsForUser(id: ObjectId) {
    return this.findEstablishedFriendshipsDataloader.load(id);
  }

  async findUsers(objectIDs: Array<ObjectID>) {
    return this.findUserDataloader.loadMany(objectIDs);
  }
}
