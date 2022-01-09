import DataLoader from "dataloader";
import { Collection, ObjectId } from "mongodb";
import { FriendshipModel } from "../repositories/user-repository";
import Friendship from "../types/friendship";

export default class FriendshipDataloader extends DataLoader<
  ObjectId,
  FriendshipModel[]
> {
  constructor(collection: Collection<Friendship>, established: boolean) {
    super(async (keys) => {
      const friendships = await collection
        .find({
          acceptedAt: {
            $exists: established,
          },
          $or: [
            {
              receiver: {
                $in: keys,
              },
            },
            {
              requester: established
                ? {
                    $in: keys,
                  }
                : {},
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
}
