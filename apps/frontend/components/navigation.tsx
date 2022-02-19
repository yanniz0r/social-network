import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import { FaBell, FaChevronCircleRight, FaEnvelope, FaGhost, FaSearch, FaUser } from "react-icons/fa";
import { useNavigationQuery } from "../graphql/generated";
import Avatar from "./avatar";
import Card from "./card";
import Container from "./container";
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
    <div className="top-0 fixed w-full z-30">
      <div className="dark:bg-blue-700 dark:bg-opacity-60 bg-blue-600 bg-opacity-75 backdrop-blur relative z-20">
        <Container y={false}>
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="text-xl font-light text-white tracking-tight bg-white bg-opacity-0 p-2 transition-all rounded-lg hover:bg-opacity-20">
                🏝 Inselnet
              </a>
            </Link>
            <div className="flex-grow" />
            <div className="px-5 flex flex-row gap-2">
              <a className="h-10 w-10 flex items-center justify-center rounded-full bg-white transition-all text-white drop-shadow-lg transform hover:scale-105 bg-opacity-20">
                <FaSearch />
              </a>
              <button onClick={() => setNotificationsOpen((prev) => !prev)} className="h-10 w-10 flex items-center justify-center rounded-full bg-white transition-all text-white drop-shadow-lg transform hover:scale-105 bg-opacity-20">
                <FaBell />
              </button>
              <Link href="/messages">
                <a className="h-10 w-10 flex items-center justify-center rounded-full bg-white transition-all text-white drop-shadow-lg transform hover:scale-105 bg-opacity-20">
                  <FaEnvelope />
                </a>
              </Link>
            </div>
            <div className="py-2">
              {navigationQuery.data?.me &&
                <Link href="/profile/me">
                  <a className="h-12 w-12 bg-white bg-opacity-75 outline-emerald-500 rounded-full flex items-center justify-center" style={{
                    backgroundImage: navigationQuery.data.me.avatarURL ? `url(${navigationQuery.data.me.avatarURL})` : undefined
                  }}>
                    Y
                  </a>
                </Link>
              }
            </div>
          </div>
        </Container>
      </div>
      <Notifications open={notificationsOpen} close={() => setNotificationsOpen(false)} />
    </div>
  );
};

export default Navigation;
