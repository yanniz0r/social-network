import { NextPage } from "next";
import { FaUser, FaUserPlus } from "react-icons/fa";
import IconButton from "../../components/icon-button";
import FriendList from "../../components/profile/friend-list";
import ProfileHeader from "../../components/profile/header";
import Tooltip from "../../components/tooltip";
import { FriendshipStatus, useProfileDetailPageQuery, useProfileDetailPageRequestFriendshipMutation } from "../../graphql/generated";

interface UserDetailPageProps {
  userID: string;
}

const UserDetailPage: NextPage<UserDetailPageProps> = ({ userID }) => {
  const userDetailPageQuery = useProfileDetailPageQuery({
    variables: {
      userID,
    },
  });
  const [requestFriendshipMutation] = useProfileDetailPageRequestFriendshipMutation()

  function requestFriendship() {
    requestFriendshipMutation({
      variables: {
        userID,
      }
    })
  }

  const friendshipStatus = userDetailPageQuery.data?.user?.friendshipStatus

  const headerActions = <>
    {friendshipStatus === FriendshipStatus.None &&
      <Tooltip text="Freund:in hinzufügen">
        <IconButton onClick={requestFriendship}>
          <FaUserPlus />
        </IconButton>
      </Tooltip>
    }
  </>

  return (
    <>
      {friendshipStatus === FriendshipStatus.RequestedByMe && (
        <div className="flex flex-row px-10 items-center py-4 bg-green-400">
          <FaUserPlus className="mr-2" /> Du hast {userDetailPageQuery.data!.user!.name} eine Freundschaftsanfrage geschickt.
        </div>
      )}
      {friendshipStatus === FriendshipStatus.RequestedByThem && (
        <div className="flex flex-row px-10 items-center py-4 bg-green-400">
          <FaUserPlus className="mr-2" /> {userDetailPageQuery.data!.user!.name} möchte mit Dir befreundet sein.
        </div>
      )}
      <div className="p-10">
        {userDetailPageQuery.data?.user && (
          <>
            <ProfileHeader
              user={userDetailPageQuery.data.user}
              actions={headerActions}
            />
            <div className="mt-4">
              <FriendList friends={userDetailPageQuery.data.user.friends} />
            </div>
          </>
        )}
      </div>
    </>
  )
};

UserDetailPage.getInitialProps = (context) => {
  return {
    userID: context.query["userID"] as string,
  };
};

export default UserDetailPage;
