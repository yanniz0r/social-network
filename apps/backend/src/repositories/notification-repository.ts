import { Collection, Db, Filter, ObjectId, WithId } from "mongodb";
import { Logger } from "tslog";
import Notification, { FriendshipRequestNotification, PostLikedNotification } from "../types/notification";

const logger = new Logger({ name: "NotificationRepository" });

export type NotificationModel = WithId<Notification>;
export type FriendshipRequestNotificationModel = WithId<FriendshipRequestNotification>;
export type PostLikedNotificationModel = WithId<PostLikedNotification>;

export default class NotificationRepository {
 
  private notificationsCollection: Collection<Notification>

  constructor(db: Db) {
    this.notificationsCollection = db.collection("notifications");
  }

  public findNotifications(filter: Filter<Notification>) {
    return this.notificationsCollection.find(filter)
  }

  public createNotification(notification: Notification) {
    return this.notificationsCollection.insertOne(notification)
  }

  public findNotificationByID(id: ObjectId) {
    return this.notificationsCollection.findOne({
      _id: id,
    })
  }

}
