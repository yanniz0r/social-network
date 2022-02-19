import { NextPage } from "next";
import { useState } from "react";
import EditAvatarModal from "../../components/edit-avatar-modal";
import FriendList from "../../components/profile/friend-list";
import ProfileHeader from "../../components/profile/header";
import { useProfileMeQuery } from "../../graphql/generated";
import SignedInLayout from "../../layouts/signed-in-layout";

const ProfileMePage: NextPage = () => {
  const [editAvatar, setEditAvatar] = useState(false);
  const meQuery = useProfileMeQuery();

  console.log(meQuery);

  return (
    <SignedInLayout>
      <EditAvatarModal open={editAvatar} onClose={() => setEditAvatar(false)} />
      <div className="p-10">
        {meQuery.data?.me && (
          <>
            <ProfileHeader
              onEditAvatar={() => setEditAvatar(true)}
              user={meQuery.data.me}
            />
            <div className="mt-4">
              <FriendList friends={meQuery.data.me.friends} />
            </div>
          </>
        )}
      </div>
    </SignedInLayout>
  );
};

export default ProfileMePage;
