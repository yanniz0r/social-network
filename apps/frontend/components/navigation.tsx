import Link from "next/link";
import { FC, useState } from "react";
import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import { useNavigationQuery } from "../graphql/generated";
import Container from "./container";
import Notifications from "./notifications";
import Search from "./search";

enum NavigationLayer {
  NOTIFICATIONS = "notifications",
  SEARCH = "search"
}

const Navigation: FC = () => {
  const navigationQuery = useNavigationQuery();
  const [openLayer, setOpenLayer] = useState<NavigationLayer>();

  function closeLayer() {
    setOpenLayer(undefined)
  }

  return (
    <div className="top-0 fixed w-full z-30 pointer-events-none">
      <div className="dark:bg-blue-700 dark:bg-opacity-60 bg-blue-600 bg-opacity-75 backdrop-blur relative z-20 h-16 pointer-events-auto">
        <Container>
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="text-xl font-light text-white tracking-tight bg-white bg-opacity-0 p-2 transition-all rounded-lg hover:bg-opacity-20">
                🏝 Inselnet
              </a>
            </Link>
            <div className="flex-grow" />
            <div className="px-5 flex flex-row gap-2">
              <button onClick={() => setOpenLayer(NavigationLayer.SEARCH)}  className="h-10 w-10 flex items-center justify-center rounded-full bg-white transition-all text-white drop-shadow-lg transform hover:scale-105 bg-opacity-20">
                <FaSearch />
              </button>
              <button onClick={() => setOpenLayer(NavigationLayer.NOTIFICATIONS)} className="h-10 w-10 flex items-center justify-center rounded-full bg-white transition-all text-white drop-shadow-lg transform hover:scale-105 bg-opacity-20">
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
      <Search open={openLayer === NavigationLayer.SEARCH} onClose={closeLayer} />
      <Notifications open={openLayer === NavigationLayer.NOTIFICATIONS} close={closeLayer} />
    </div>
  );
};

export default Navigation;

export const NavigationSpacer: FC = () => <div className="h-16" />
