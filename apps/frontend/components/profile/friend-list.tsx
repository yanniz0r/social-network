import { FC } from "react";
import { User } from "../../graphql/generated";
import Avatar from "../avatar";
import Card from "../card";

interface FriendListProps {
  friends: Array<Pick<User, "name" | "online" | "id">>;
}

const FriendList: FC<FriendListProps> = ({ friends }) => {
  return (
    <Card>
      <div className="p-5">
        <h2 className="dark:text-slate-200 text-lg">Freunde</h2>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="flex items-center mt-3">
              <Avatar size="md" name={friend.name} online={friend.online} />
              <div className="ml-3 dark:text-slate-400">{friend.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default FriendList;
