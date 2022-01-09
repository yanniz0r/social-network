import { Reference } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { FaTimes, FaUserPlus } from "react-icons/fa";
import Avatar from "../components/avatar";
import Card from "../components/card";
import IconButton from "../components/icon-button";
import {
  useFriendshipsPageQuery,
  useFriendsPageAcceptFriendshipRequestMutation as useAcceptFriendshipMutation,
} from "../graphql/generated";

const FriendshipsPage: NextPage = () => {
  const friendsPageQuery = useFriendshipsPageQuery();

  const [acceptFriendshipMutation] = useAcceptFriendshipMutation();

  function acceptFriendship(friendshipID: string) {
    acceptFriendshipMutation({
      variables: {
        friendshipID,
      },
      refetchQueries: ["FriendshipsPage"],
      update(cache) {
        cache.modify({
          fields: {
            friendshipRequests(existingRequests: Reference[], { readField }) {
              console.log(existingRequests);
              return existingRequests.filter((existingRequest) => {
                return readField("id", existingRequest) !== friendshipID;
              });
            },
          },
        });
      },
    });
  }

  return (
    <div className="p-10">
      {Boolean(friendsPageQuery.data?.friendshipRequests.length) && (
        <Card className="py-3 px-5 mb-5">
          <h2 className="text-xl dark:text-white mb-2">
            Freundschaftsanfragen
          </h2>
          <ul>
            {friendsPageQuery.data?.friendshipRequests.map(
              (friendshipRequest) => (
                <li key={friendshipRequest.from.id}>
                  <Link passHref href={`/profile/${friendshipRequest.from.id}`}>
                    <a className="flex py-2">
                      <Avatar
                        size="md"
                        name={friendshipRequest.from.name}
                        online={friendshipRequest.from.online}
                      />
                      <div className="ml-2 flex items-center flex-grow">
                        <div className="text-md dark:text-gray-300">
                          {friendshipRequest.from.name}
                        </div>
                      </div>
                      <div className="flex">
                        <IconButton color="red">
                          <FaTimes />
                        </IconButton>
                        <div className="w-2" />
                        <IconButton
                          color="green"
                          onClick={() => acceptFriendship(friendshipRequest.id)}
                        >
                          <FaUserPlus />
                        </IconButton>
                      </div>
                    </a>
                  </Link>
                </li>
              )
            )}
          </ul>
        </Card>
      )}

      <Card className="px-5 py-3">
        <h2 className="text-xl dark:text-white mb-2">Deine Freunde</h2>
        <ul>
          {friendsPageQuery.data?.me.friends.map((friend) => (
            <li key={friend.id}>
              <Link passHref href={`/profile/${friend.id}`}>
                <a className="flex py-2">
                  <Avatar size="md" name={friend.name} online={friend.online} />
                  <div className="ml-2 flex items-center flex-grow">
                    <div className="text-md dark:text-gray-300">
                      {friend.name}
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default FriendshipsPage;
