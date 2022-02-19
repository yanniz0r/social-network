import { Reference } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { FaTimes, FaUserPlus } from "react-icons/fa";
import Avatar from "../components/avatar";
import Button from "../components/button";
import Card from "../components/card";
import IconButton from "../components/icon-button";
import {
  useFriendshipsPageQuery,
  useFriendsPageAcceptFriendshipRequestMutation as useAcceptFriendshipMutation,
} from "../graphql/generated";
import SignedInLayout from "../layouts/signed-in-layout";

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
    <SignedInLayout>
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
                          imageURL={friendshipRequest.from.avatarURL ?? undefined}
                          name={friendshipRequest.from.name}
                          online={friendshipRequest.from.online}
                        />
                        <div className="ml-2 flex items-center flex-grow">
                          <div className="text-md dark:text-slate-300">
                            {friendshipRequest.from.name}
                          </div>
                        </div>
                        <div className="flex">
                          <IconButton color="error">
                            <FaTimes />
                          </IconButton>
                          <div className="w-2" />
                          <IconButton
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

        <Card className="p-5 mb-5">
          <h2 className="text-xl dark:text-white mb-2">
            Vielleicht kennst du...?
          </h2>
          <ul className="grid grid-cols-5 gap-4 mt-4">
            {friendsPageQuery.data?.friendshipRecommendations.map(
              (recommendation) => (
                <li
                  key={recommendation.id}
                  className="inline-block cursor-pointer"
                >
                  <Link passHref href={`/profile/${recommendation.id}`}>
                    <div className="border-2 border-slate-900 rounded-lg p-5 flex flex-col items-center">
                      <Avatar
                        size="lg"
                        online={recommendation.online}
                        imageURL={recommendation.avatarURL ?? undefined}
                        name={recommendation.name}
                      />
                      <h4 className="text-slate-200 my-2">
                        {recommendation.name}
                      </h4>
                      <Button>Freund:in hinzufügen</Button>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </Card>

        <Card className="px-5 py-3">
          <h2 className="text-xl dark:text-white mb-2">Deine Freunde</h2>
          <ul>
            {friendsPageQuery.data?.me.friends.map((friend) => (
              <li key={friend.id}>
                <Link passHref href={`/profile/${friend.id}`}>
                  <a className="flex py-2">
                    <Avatar size="md" name={friend.name} online={friend.online} />
                    <div className="ml-2 flex items-center flex-grow">
                      <div className="text-md dark:text-slate-300">
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
    </SignedInLayout>
  );
};

export default FriendshipsPage;
