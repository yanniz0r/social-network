import { ObjectId } from "mongodb";
import Friendship from "./friendship";

type Notification = FriendshipRequestNotification

export default Notification

export interface BaseNotification {
  userID: ObjectId,
}

export interface FriendshipRequestNotification extends BaseNotification {
  type: 'friendship-request'
  friendship: Omit<Friendship, 'acceptedAt'>
}

