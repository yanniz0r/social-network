import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaGhost, FaUser, FaUserPlus } from "react-icons/fa";
import AlertBar from "../../components/alert-bar";
import Button from "../../components/button";
import Card from "../../components/card";
import NoPostsCard from "../../components/card-presets/no-posts-card";
import Container from "../../components/container";
import IconButton from "../../components/icon-button";
import PostCard from "../../components/post-card";
import FriendList from "../../components/profile/friend-list";
import ProfileHeader from "../../components/profile/header";
import ProfileUserInfo from "../../components/profile/user-info";
import Tooltip from "../../components/tooltip";
import {
  FriendshipStatus,
  useProfileDetailPageQuery,
  useProfileDetailPageRequestFriendshipMutation,
} from "../../graphql/generated";
import SignedInLayout from "../../layouts/signed-in-layout";

interface UserDetailPageProps {
  userID: string;
}

const UserDetailPage: NextPage<UserDetailPageProps> = ({ userID }) => {
  const router = useRouter()
  const userDetailPageQuery = useProfileDetailPageQuery({
    variables: {
      userID,
    },
    onCompleted(data) {
      const userIsMe = data.me.id === data.user?.id
      if (userIsMe) {
        router.replace("/profile/me")
      }
    }
  });
  const [requestFriendshipMutation] =
    useProfileDetailPageRequestFriendshipMutation();

  function requestFriendship() {
    requestFriendshipMutation({
      variables: {
        userID,
      },
    });
  }

  const friendshipStatus = userDetailPageQuery.data?.user?.friendshipStatus;

  const headerActions = (
    <>
      {friendshipStatus === FriendshipStatus.None && (
        <Tooltip text="Freund:in hinzufügen">
          <IconButton onClick={requestFriendship}>
            <FaUserPlus />
          </IconButton>
        </Tooltip>
      )}
      {friendshipStatus === FriendshipStatus.RequestedByThem && (
        <Tooltip text="Anfrage akzeptieren">
          <IconButton onClick={requestFriendship}>
            <FaUserPlus />
          </IconButton>
        </Tooltip>
      )}
    </>
  );

  const alerts = (
    <>
      {friendshipStatus === FriendshipStatus.RequestedByMe && (
        <AlertBar icon={<FaUserPlus />}>
          {userDetailPageQuery.data!.user!.name} eine Freundschaftsanfrage
          geschickt.
        </AlertBar>
      )}
      {friendshipStatus === FriendshipStatus.RequestedByThem && (
        <AlertBar icon={<FaUserPlus />}>
          {userDetailPageQuery.data!.user?.name} möchte mit Dir befreundet sein
        </AlertBar>
      )}
    </>
  );

  return (
    <SignedInLayout>
      {userDetailPageQuery.data?.user && (
        <>
          <div
            className="h-40 sm:h-60 md:h-80 lg:h-96 bg-center bg-cover"
            style={{ backgroundImage: "url(/hero.jpg)" }}
          />
          <ProfileHeader
            user={userDetailPageQuery.data.user}
            actions={headerActions}
          />
          {alerts}
          <Container className="mt-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-4/12 lg:w-3/12">
                <div className="sticky self-start top-36 flex flex-col gap-4">
                  <ProfileUserInfo user={userDetailPageQuery.data.user} />
                  <FriendList friends={userDetailPageQuery.data.user.friends} />
                </div>
              </div>
              <div className="w-full md:w-8/12 lg:w-9/12">
                {userDetailPageQuery.data.posts.map((post) => (
                  <div key={post.id} className="mb-4">
                    <PostCard me={userDetailPageQuery.data?.me!} post={post} />
                  </div>
                ))}
                {userDetailPageQuery.data.posts.length === 0 && (
                  <NoPostsCard name={userDetailPageQuery.data.user.name} />
                )}
              </div>
            </div>
          </Container>
        </>
      )}
    </SignedInLayout>
  );
};

UserDetailPage.getInitialProps = (context) => {
  return {
    userID: context.query["userID"] as string,
  };
};

export default UserDetailPage;
