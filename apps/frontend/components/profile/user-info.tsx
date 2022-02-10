import { format } from "date-fns";
import { FC, ReactNode } from "react";
import {
  FaBaseballBall,
  FaBirthdayCake,
  FaCity,
  FaSuitcase,
} from "react-icons/fa";
import { User } from "../../graphql/generated";
import Card from "../card";

interface ProfileUserInfoProps {
  user: Pick<User, 'city' | 'birthday' | 'hobbies' | 'job'>
}

interface UserInfo {
  icon: ReactNode;
  content: ReactNode;
}

const ProfileUserInfo: FC<ProfileUserInfoProps> = (props) => {
  const userInfos: UserInfo[] = [];
  if (props.user.birthday) {
    const birthday = format(new Date(props.user.birthday), 'dd.MM.yyyy')
    userInfos.push({
      icon: <FaBirthdayCake />,
      content: `Hat am ${birthday} Geburtstag`,
    })
  }
  if (props.user.city) {
    userInfos.push({
      icon: <FaCity />,
      content: `Wohnt in ${props.user.city}`,
    },)
  }
  if (props.user.hobbies) {
    userInfos.push({
      icon: <FaBaseballBall />,
      content: props.user.hobbies.join(', '),
    })
  }
  if (props.user.job) {
    userInfos.push({
      icon: <FaSuitcase />,
      content: `Arbeitet als ${props.user.job.position} bei ${props.user.job.company}`,
    },)
  }

  return (
    <Card>
      <div className="p-5">
        <h2 className="dark:text-slate-200 text-lg mb-3">Infos</h2>
        <ul className="flex flex-col gap-2">
          {userInfos.map(({ content, icon }, index) => (
            <li className="flex items-center gap-3" key={index}>
              <div className="dark:text-slate-500 text-slate-300">{icon}</div>
              <div className="dark:text-slate-300 text-slate-700">{content}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ProfileUserInfo;
