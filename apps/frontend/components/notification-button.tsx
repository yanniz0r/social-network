import classNames from "classnames"
import { FC, useState } from "react"
import { FaBell } from "react-icons/fa"
import { useNotificationButtonNewNotificationSubscription, useNotificationButtonQuery } from "../graphql/generated"
import IconButton from "./icon-button"
import NotificationRow from "./notification-row"

interface NotificationButtonProps {
}

const NotificationButton: FC<NotificationButtonProps> = (props) => {
  const [open, setOpen] = useState(false)
  const query = useNotificationButtonQuery()
  useNotificationButtonNewNotificationSubscription({
    onSubscriptionData() {
      query.refetch()
    }
  })

  const numberOfNotifications = query.data?.notifications.length ?? 0

  const layerClassName = classNames("absolute block w-64 right-0 transition-all pointer-events-nonde opacity-0", {
    'opacity-100': open,
  })
  
  return <div className="relative">
    <IconButton bubble={numberOfNotifications} onClick={() => setOpen(!open)}>
      <FaBell />
    </IconButton>
    <div className={layerClassName}>
      <div className="flex justify-end">
        <svg width="10" height="10" viewBox="0 0 10 10" className="transform rotate-180 text-gray-50 text-opacity-75 fill-current mr-3.5">
          <polygon points="0,0 5,5 10,0" />
        </svg>
      </div>
      <div className="bg-gray-50 rounded-lg bg-opacity-75">
        {query.data?.notifications.map(notification => (
          <div key={notification.id} className="p-2">
            {notification.__typename === 'FriendshipRequestNotification' &&
              <NotificationRow date={new Date(notification.date)} linkURL={`/friendships`} imageURL={notification.from.avatarURL ?? undefined}>
                {notification.from.name} möchte mit dir befreundet sein!
              </NotificationRow>
            }
          </div>
        ))}
      </div>
    </div>
  </div>
}

export default NotificationButton
