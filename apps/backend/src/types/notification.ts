import { ObjectId } from "mongodb";
import Friendship from "./friendship";

type Notification = FriendshipRequestNotification | PostLikedNotification;

export default Notification;

export interface BaseNotification {
  userID: ObjectId;
}

export interface FriendshipRequestNotification extends BaseNotification {
  type: "friendship-request";
  friendship: Omit<Friendship, "acceptedAt">;
}

export interface PostLikedNotification extends BaseNotification {
  type: "post-liked";
  postID: ObjectId;
  likerID: ObjectId;
  date: Date;
}
