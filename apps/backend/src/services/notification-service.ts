import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import NotificationRepository from "../repositories/notification-repository";
import { FriendshipModel } from "../repositories/user-repository";
import initObjectID from "../utils/init-object-id";

const logger = new Logger({ name: "NotificationService" });

export default class NotificationService {
  constructor(
    private notificationRepository: NotificationRepository
  ) {}

  getNotificationsForUser(id: string | ObjectId) {
    return this.notificationRepository.findNotifications({
      userID: initObjectID(id)
    }).toArray()
  }

  createFriendshipRequestNotification(friendship: FriendshipModel) {
    return this.notificationRepository.createNotification({
      userID: friendship.receiver,
      type: 'friendship-request',
      friendship: {
        createdAt: friendship.createdAt,
        receiver: friendship.receiver,
        requester: friendship.requester,
      }
    })
  }

}
