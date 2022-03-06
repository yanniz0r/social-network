import classNames from "classnames";
import { FC } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import {
  useNotificationsNewNotificationSubscription,
  useNotificationsQuery,
} from "../graphql/generated";
import Container from "./container";
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
    "bg-slate-100 bg-opacity-50 backdrop-blur shadow-xl transform transition-all z-10 relative",
    {
      "translate-y-0 opacity-100": props.open,
      "pointer-events-none -translate-y-10 opacity-0": !props.open,
    }
  );

  return (
    <div className={containerClassName}>
      <Container className="py-5">
        <div className="flex gap-5 relative">
            {notificationsQuery.data?.notifications.map((notification) => {
              if (notification.__typename === "FriendshipRequestNotification") {
                return <NotificationRow
                  date={new Date(notification.date)}
                  linkURL={`/friendships`}
                  imageURL={notification.from.avatarURL ?? undefined}
                >
                  {notification.from.firstName} möchte mit dir befreundet sein!
                </NotificationRow>
              }

              if (notification.__typename == "PostLikedNotification") {
                return <NotificationRow
                  date={new Date(notification.date)}
                  imageURL={notification.liker.avatarURL ?? undefined}
                  linkURL="/"
                >
                  {notification.liker.firstName} gefällt dein Post!
                </NotificationRow>
              }
            }).map(notification => (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:1/4">
                {notification}
              </div>
            ))}
          <div className="absolute -right-10 flex h-full items-center px-3">
            <FaChevronCircleRight />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Notifications;
