import DataLoader from "dataloader";
import { Collection, ObjectId } from "mongodb";
import { FriendshipModel } from "../repositories/user-repository";
import Friendship from "../types/friendship";

export default class FriendshipDataloader extends DataLoader<
  ObjectId,
  FriendshipModel[]
> {
  constructor(collection: Collection<Friendship>) {
    super(async (keys) => {
      const friendships = await collection
        .find({
          $or: [
            {
              receiver: {
                $in: keys,
              },
            },
            {
              requester: {
                $in: keys,
              }
            },
          ],
        })
        .toArray();

      return keys.map((userID) => {
        const matchingFriendships = friendships.filter((friendship) => {
          return (
            friendship.requester.equals(userID) ||
            friendship.receiver.equals(userID)
          );
        });
        return matchingFriendships;
      });
    });
  }

  async loadEstablished(id: ObjectId) {
    const loaded = await this.load(id)
    return loaded.filter(friendship => Boolean(friendship.acceptedAt))
  }

  async loadUnestablished(id: ObjectId) {
    const loaded = await this.load(id)
    return loaded.filter(friendship => !friendship.acceptedAt)
  }

}
