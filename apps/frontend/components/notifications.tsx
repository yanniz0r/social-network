import classNames from "classnames";
import { FC } from "react";
import { FaChevronLeft } from "react-icons/fa";
import {
  useNotificationsNewNotificationSubscription,
  useNotificationsQuery,
} from "../graphql/generated";
import NotificationRow from "./notification-row";

interface NotificationsProps {
  open: boolean;
  close(): void;
}

const Notifications: FC<NotificationsProps> = (props) => {
  const notificationsQuery = useNotificationsQuery();
  useNotificationsNewNotificationSubscription({
    onSubscriptionData() {
      notificationsQuery.refetch();
    },
  });
  const containerClassName = classNames(
    "w-full h-full absolute left-0 top-0 bg-gray-800 transition-all bg-opacity-90 backdrop-blur",
    {
      "-left-full": !props.open,
    }
  );

  return (
    <div className={containerClassName}>
      <div className="p-4 text-center text-white border-b-2 border-gray-700 relative">
        Neuigkeiten
        <a
          className="absolute left-0 top-0 h-full flex items-center p-2 cursor-pointer"
          onClick={props.close}
        >
          <FaChevronLeft />
        </a>
      </div>
      {notificationsQuery.data?.notifications.map((notification) => (
        <div key={notification.id} className="p-2">
          {notification.__typename === "FriendshipRequestNotification" && (
            <NotificationRow
              date={new Date(notification.date)}
              linkURL={`/friendships`}
              imageURL={notification.from.avatarURL ?? undefined}
            >
              {notification.from.firstName} möchte mit dir befreundet sein!
            </NotificationRow>
          )}
          {notification.__typename == "PostLikedNotification" && (
            <NotificationRow
              date={new Date(notification.date)}
              imageURL={notification.liker.avatarURL ?? undefined}
              linkURL="/"
            >
              {notification.liker.firstName} gefällt dein Post!
            </NotificationRow>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
