import { NextPage } from "next";
import { FaGhost, FaUser, FaUserPlus } from "react-icons/fa";
import AlertBar from "../../components/alert-bar";
import Button from "../../components/button";
import Card from "../../components/card";
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

interface UserDetailPageProps {
  userID: string;
}

const UserDetailPage: NextPage<UserDetailPageProps> = ({ userID }) => {
  const userDetailPageQuery = useProfileDetailPageQuery({
    variables: {
      userID,
    },
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
    <>
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
          <Container>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-4/12 lg:w-3/12">
                <div className="sticky self-start top-36">
                  <div>
                    <ProfileUserInfo />
                  </div>
                  <div className="mt-4">
                    <FriendList friends={userDetailPageQuery.data.user.friends} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-8/12 lg:w-9/12">
                {userDetailPageQuery.data.posts.map((post) => (
                  <div key={post.id} className="mb-4">
                    <PostCard me={userDetailPageQuery.data?.me!} post={post} />
                  </div>
                ))}
                {userDetailPageQuery.data.posts.length === 0 && (
                  <Card className="p-10 flex flex-col gap-5 items-center justify-center">
                    <FaGhost className="text-5xl text-slate-400" />
                    <div>
                      <h3 className="text-white text-xl text-center">
                        Leer hier...
                      </h3>
                      <p className="text-slate-400 text-center">
                        {userDetailPageQuery.data.user.name} hat noch keine
                        Beiträge gepostet.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button>Nachricht senden</Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

UserDetailPage.getInitialProps = (context) => {
  return {
    userID: context.query["userID"] as string,
  };
};

export default UserDetailPage;
