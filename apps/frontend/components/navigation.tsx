import { FC } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigationQuery } from "../graphql/generated";
import IconButton from "./icon-button";

const Navigation: FC = () => {
  const navigationQuery = useNavigationQuery()
  return <div className="pb-20">
    <div className="w-full bg-gray-700 fixed shadow-lg bg-opacity-50 backdrop-blur">
      <div className="flex justify-between px-10">
        <div className="p-5 text-xl text-pink-500">
          Inselnet
        </div>
        <div className="flex items-center">
          <IconButton bubble={navigationQuery.data?.friendshipRequests.length}>
            <FaUser />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
}

export default Navigation
