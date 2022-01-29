import { Collection, Db, Filter, WithId } from "mongodb";
import { Logger } from "tslog";
import Notification from "../types/notification";

const logger = new Logger({ name: "NotificationRepository" });

export type NotificationModel = WithId<Notification>;

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

}
