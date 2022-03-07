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
    "bg-slate-100 dark:bg-slate-800 bg-opacity-50 dark:bg-opacity-25 backdrop-blur shadow-xl transform transition-all z-10 relative dark:border-b dark:border-slate-700",
    {
      "translate-y-0 opacity-100 pointer-events-auto": props.open,
      "-translate-y-10 opacity-0 pointer-events-none": !props.open,
    }
  );

  const notificationWrapperClassName = "w-full sm:w-1/2 md:w-1/3 lg:1/4"

  return (
    <div className={containerClassName}>
      <Container className="py-5">
        <div className="flex gap-5 relative">
            {notificationsQuery.data?.notifications.map((notification) => {
              if (notification.__typename === "FriendshipRequestNotification") {
                return <div className={notificationWrapperClassName} key={notification.id}>
                  <NotificationRow
                    date={new Date(notification.date)}
                    linkURL={`/friendships`}
                    imageURL={notification.from.avatarURL ?? undefined}
                  >
                    {notification.from.firstName} möchte mit dir befreundet sein!
                  </NotificationRow>
                </div>
              }

              if (notification.__typename == "PostLikedNotification") {
                return <div className={notificationWrapperClassName} key={notification.id}>
                  <NotificationRow
                    date={new Date(notification.date)}
                    imageURL={notification.liker.avatarURL ?? undefined}
                    linkURL="/"
                  >
                    {notification.liker.firstName} gefällt dein Post!
                  </NotificationRow>
                </div>
              }
            })
          }
          <div className="absolute -right-10 flex h-full items-center px-3 dark:text-slate-200 text-slate-800">
            <FaChevronCircleRight />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Notifications;
