import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import NotificationRepository from "../repositories/notification-repository";
import { FriendshipModel } from "../repositories/user-repository";
import initObjectID from "../utils/init-object-id";
import { Redis } from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";

const logger = new Logger({ name: "NotificationService" });

const NEW_NOTIFICATION_FOR_TOPIC = (userID: ObjectId) => `notification::to#${userID.toString()}`

export default class NotificationService {

  private pubsub: RedisPubSub;

  constructor(
    private notificationRepository: NotificationRepository,
    redis: Redis
  ) {
    this.pubsub = new RedisPubSub({
      publisher: redis,
      subscriber: redis,
    })
  }

  getNotification(id: string | ObjectId) {
    return this.notificationRepository.findNotificationByID(initObjectID(id))
  }

  getNotificationsForUser(id: string | ObjectId) {
    return this.notificationRepository.findNotifications({
      userID: initObjectID(id)
    }).toArray()
  }

  subscribeToNewNotifications(userID: string | ObjectId): AsyncIterable<any> {
    logger.debug('Subscribed to new notifications for', userID)
    return {
      [Symbol.asyncIterator]: () => this.pubsub.asyncIterator(NEW_NOTIFICATION_FOR_TOPIC(initObjectID(userID)))
    }
  }

  async createFriendshipRequestNotification(friendship: FriendshipModel) {
    const notification = await this.notificationRepository.createNotification({
      userID: friendship.receiver,
      type: 'friendship-request',
      friendship: {
        createdAt: friendship.createdAt,
        receiver: friendship.receiver,
        requester: friendship.requester,
      }
    })

    await this.pubsub.publish(NEW_NOTIFICATION_FOR_TOPIC(friendship.receiver), notification.insertedId)

    return notification
  }

}
