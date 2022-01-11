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
      <h2 className="px-5 pt-5 pb-2 dark:text-gray-200 text-lg">Freunde</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} className="flex px-5 py-3 items-center">
            <Avatar size="md" name={friend.name} online={friend.online} />
            <div className="ml-3 dark:text-gray-400">{friend.name}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default FriendList;
