import { NextPage } from "next";
import { useState } from "react";
import NoPostsCard from "../../components/card-presets/no-posts-card";
import Container from "../../components/container";
import EditAvatarModal from "../../components/edit-avatar-modal";
import PostCard from "../../components/post-card";
import FriendList from "../../components/profile/friend-list";
import ProfileHeader from "../../components/profile/header";
import ProfileUserInfo from "../../components/profile/user-info";
import { useProfileMeQuery } from "../../graphql/generated";
import SignedInLayout from "../../layouts/signed-in-layout";

const ProfileMePage: NextPage = () => {
  const [editAvatar, setEditAvatar] = useState(false);
  const meQuery = useProfileMeQuery();

  console.log(meQuery);
  <EditAvatarModal open={editAvatar} onClose={() => setEditAvatar(false)} />

  return (
    <SignedInLayout>
    {meQuery.data?.me && (
      <>
        <div
          className="h-40 sm:h-60 md:h-80 lg:h-96 bg-center bg-cover"
          style={{ backgroundImage: "url(/hero.jpg)" }}
        />
        <ProfileHeader
          user={meQuery.data.me}
          // actions={headerActions}
        />
        <Container className="mt-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-4/12 lg:w-3/12">
              <div className="sticky self-start top-36 flex flex-col gap-4">
                <ProfileUserInfo user={meQuery.data.me} />
                <FriendList friends={meQuery.data.me.friends} />
              </div>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              {meQuery.data.posts.map((post) => (
                <div key={post.id} className="mb-4">
                  <PostCard me={meQuery.data?.me!} post={post} />
                </div>
              ))}
              {meQuery.data.posts.length === 0 && (
                <NoPostsCard name={meQuery.data.me.name} />
              )}
            </div>
          </div>
        </Container>
      </>
    )}
  </SignedInLayout>
  );
};

export default ProfileMePage;
