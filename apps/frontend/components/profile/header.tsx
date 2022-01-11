import { differenceInYears, format } from "date-fns";
import { FC } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { User } from "../../graphql/generated";
import Card from "../card";

interface ProfileHeaderProps {
  user: Pick<User, 'name' | 'birthday'>
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ user }) => {
  return <div>
    <Card className="p-5 flex items-center">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 font-bold text-white relative">
        {user.name[0]}
      </div>
      <div className="ml-5">
        <h1 className="text-xl text-gray-100 mb-2">
          {user.name}
        </h1>
        {user.birthday && (
          <div className="flex items-center text-sm dark:text-gray-400">
            <FaBirthdayCake />
            <span className="ml-1">
              Geboren am{" "}
              {format(new Date(user.birthday), "dd.MM.yyyy")}{" "}
              (
              {differenceInYears(
                new Date(),
                new Date(user.birthday)
              )}{" "}
              Jahre alt)
            </span>
          </div>
        )}
      </div>
    </Card>
  </div>
}

export default ProfileHeader
