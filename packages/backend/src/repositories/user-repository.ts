import { ObjectID } from "bson";
import DataLoader from "dataloader";
import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Logger } from "tslog";
import User from "../types/user";

const logger = new Logger({ name: "UserRepository" });

export type UserModel = WithId<User>;

export default class UserRepository {
  private collection: Collection<User>;

  private findUserDataloader = new DataLoader<ObjectId, UserModel | null>(
    async (keys) => {
      const users = await this.collection
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

  constructor(db: Db) {
    this.collection = db.collection("users");
  }

  async findFirst() {
    return await this.collection.findOne()!;
  }

  async findUser(id: ObjectId) {
    return this.findUserDataloader.load(id);
  }

  async findUsers(objectIDs: Array<ObjectID>) {
    return this.findUserDataloader.loadMany(objectIDs);
  }
}
