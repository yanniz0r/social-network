import { differenceInYears, format } from "date-fns";
import { FC, ReactNode } from "react";
import { FaBirthdayCake, FaCog } from "react-icons/fa";
import { User } from "../../graphql/generated";
import Card from "../card";

interface ProfileHeaderProps {
  user: Pick<User, "name" | "birthday" | "avatarURL">;
  actions?: ReactNode;
  onEditAvatar?(): void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  user,
  onEditAvatar,
  actions,
}) => {
  return (
    <div>
      <Card className="p-5 flex items-center">
        <div className="relative">
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full bg-red-500 font-bold text-white bg-cover"
            onClick={onEditAvatar}
            style={{
              backgroundImage: user.avatarURL
                ? `url(${user.avatarURL})`
                : undefined,
            }}
          >
            {!user.avatarURL && user.name[0]}
          </div>
          {Boolean(onEditAvatar) && (
            <button
              onClick={onEditAvatar}
              className="absolute flex items-center justify-center -top-1 -right-1 w-8 h-8 rounded-full bg-gray-100 bg-opacity-60 backdrop-blur shadow"
            >
              <FaCog />
            </button>
          )}
        </div>
        <div className="ml-5 flex-grow">
          <h1 className="text-xl text-gray-100 mb-2">{user.name}</h1>
          {user.birthday && (
            <div className="flex items-center text-sm dark:text-gray-400">
              <FaBirthdayCake />
              <span className="ml-1">
                Geboren am {format(new Date(user.birthday), "dd.MM.yyyy")} (
                {differenceInYears(new Date(), new Date(user.birthday))} Jahre
                alt)
              </span>
            </div>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </Card>
    </div>
  );
};

export default ProfileHeader;
