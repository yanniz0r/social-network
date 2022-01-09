import { ObjectID } from "bson";

export default interface Friendship {
  acceptedAt?: Date;
  requester: ObjectID;
  receiver: ObjectID;
  createdAt: Date;
}
