import { FC, ReactNode } from "react";
import {
  FaBaseballBall,
  FaBirthdayCake,
  FaCity,
  FaSuitcase,
} from "react-icons/fa";
import Card from "../card";

interface ProfileUserInfoProps {}

interface UserInfo {
  icon: ReactNode;
  content: ReactNode;
}

const ProfileUserInfo: FC<ProfileUserInfoProps> = (props) => {
  const userInfos: UserInfo[] = [
    {
      icon: <FaCity />,
      content: "Wohnt in Hamburg",
    },
    {
      icon: <FaSuitcase />,
      content: "Arbeitet als Softwareentwickler bei Meta",
    },
    {
      icon: <FaBirthdayCake />,
      content: "Hat am 3.1.2002 Geburtstag (20 Jahre alt)",
    },
    {
      icon: <FaBaseballBall />,
      content: "Gaming, Holzarbeiten und Katzen ❤️",
    },
  ];

  return (
    <Card>
      <div className="p-5">
        <h2 className="dark:text-slate-200 text-lg mb-3">Infos</h2>
        <ul className="flex flex-col gap-2">
          {userInfos.map(({ content, icon }, index) => (
            <li className="flex items-center gap-3">
              <div className="text-slate-500">{icon}</div>
              <div className="text-slate-300">{content}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ProfileUserInfo;
