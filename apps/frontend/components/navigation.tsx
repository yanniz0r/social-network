import Link from "next/link";
import { FC, ReactNode } from "react";
import { FaBell, FaGhost, FaUser } from "react-icons/fa";
import { useNavigationQuery } from "../graphql/generated";

interface NavItem {
  text: string
  icon: ReactNode
  badge?: string | number
  href: string
}

const Navigation: FC = () => {
  const navigationQuery = useNavigationQuery();

  const navitems: NavItem[] = [
    {
      text: 'Posts',
      icon: <FaGhost />,
      href: '/',
    },
    {
      text: 'Neuigkeiten',
      icon: <FaBell />,
      badge: navigationQuery.data?.notifications.length,
      href: '#notifications'
    },
    {
      text: 'Freunde',
      icon: <FaUser />,
      badge: navigationQuery.data?.friendshipRequests.length,
      href: '/friendships'
    }
  ]

  return (
    <div className="bg-gray-800 lg:w-2/12 flex-none h-screen sticky top-0">
      {navigationQuery.data?.me &&
        <Link passHref href="/profile/me">
          <a className="flex flex-row gap-3 items-center px-5 py-5 hover:bg-gray-700">
            <div className="h-14 w-14 bg-teal-500 rounded-full text-black text-opacity-50 flex items-center justify-center" style={{
              backgroundImage: navigationQuery.data.me.avatarURL ? `url(${navigationQuery.data.me.avatarURL})` : undefined
            }}>
              {!navigationQuery.data.me.avatarURL && <FaUser />}
            </div>
            <div>
              <div className="text-lg mb-1 text-white">{navigationQuery.data.me.firstName}</div>
              <div className="px-1.5 py-0.5 text-sm text-white bg-green-500 rounded-lg inline-block">
                Online
              </div>
            </div>
          </a>
        </Link>
      }
      <ul className="flex flex-col px-2 mt-5">
        {navitems.map((item, key) => (
          <li key={key}>
            <Link passHref href={item.href}>
              <a className="flex items-center gap-2 text-lg px-4 py-3 transition-all text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                <div className="text-gray-500">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  {item.text}
                </div>
                {item.badge &&
                  <div className="w-6 h-6 text-sm flex items-center justify-center rounded-full text-white bg-teal-500">
                    {item.badge}
                  </div>
                }
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
