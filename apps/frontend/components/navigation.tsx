import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import { FaBell, FaGhost, FaUser } from "react-icons/fa";
import { useNavigationQuery } from "../graphql/generated";
import Notifications from "./notifications";

interface NavigationItemBase {
  text: string;
  icon: ReactNode;
  badge?: string | number;
}

interface LinkNotificationItem extends NavigationItemBase {
  href: string;
}

interface ClickNotificationItem extends NavigationItemBase {
  onClick(): void;
}

type NavItem = LinkNotificationItem | ClickNotificationItem;

const Navigation: FC = () => {
  const navigationQuery = useNavigationQuery();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navitems: NavItem[] = [
    {
      text: "Posts",
      icon: <FaGhost />,
      href: "/",
    },
    {
      text: "Neuigkeiten",
      icon: <FaBell />,
      badge: navigationQuery.data?.notifications.length || undefined,
      onClick() {
        setNotificationsOpen(true);
      },
    },
    {
      text: "Freunde",
      icon: <FaUser />,
      badge: navigationQuery.data?.friendshipRequests.length || undefined,
      href: "/friendships",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 dark:border-r shadow-md border-slate-300 dark:border-slate-700 lg:w-2/12 flex-none h-screen sticky top-0 z-20">
      <Notifications
        open={notificationsOpen}
        close={() => setNotificationsOpen(false)}
      />
      {navigationQuery.data?.me && (
        <Link passHref href="/profile/me">
          <a className="flex flex-row gap-3 items-center px-5 py-5 hover:bg-slate-200 dark:hover:bg-slate-700">
            <div
              className="h-14 w-14 bg-blue-500 rounded-full text-black text-opacity-50 flex items-center justify-center"
              style={{
                backgroundImage: navigationQuery.data.me.avatarURL
                  ? `url(${navigationQuery.data.me.avatarURL})`
                  : undefined,
              }}
            >
              {!navigationQuery.data.me.avatarURL && <FaUser />}
            </div>
            <div>
              <div className="text-lg mb-1 dark:text-white">
                {navigationQuery.data.me.firstName}
              </div>
              <div className="px-1.5 py-0.5 text-sm text-white bg-emerald-500 rounded-lg inline-block">
                Online
              </div>
            </div>
          </a>
        </Link>
      )}
      <ul className="flex flex-col px-2 mt-5">
        {navitems.map((item, key) => {
          const navigationItem = (
            <a
              onClick={"onClick" in item ? item.onClick : undefined}
              className="flex group cursor-pointer items-center gap-2 text-lg px-4 py-3 transition-all dark:text-slate-300 text-slate-700 dark:hover:text-white hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <div className="dark:text-slate-500 text-slate-300 group-hover:text-blue-500">{item.icon}</div>
              <div className="flex-grow">{item.text}</div>
              {item.badge && (
                <div className="w-6 h-6 text-sm flex items-center justify-center rounded-full text-white bg-blue-500 ">
                  {item.badge}
                </div>
              )}
            </a>
          );
          if ("href" in item) {
            return <Link href={item.href}>{navigationItem}</Link>;
          }
          return navigationItem;
        })}
      </ul>
    </div>
  );
};

export default Navigation;
