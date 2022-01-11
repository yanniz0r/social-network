import { NextPage } from "next";
import FriendList from "../../components/profile/friend-list";
import ProfileHeader from "../../components/profile/header";
import { useProfileMeQuery } from "../../graphql/generated";

const ProfileMePage: NextPage = () => {
  const meQuery = useProfileMeQuery();
  return (
    <>
      <div className="p-10">
        {meQuery.data?.me && (
          <>
            <ProfileHeader user={meQuery.data.me} />
            <div className="mt-4">
              <FriendList friends={meQuery.data.me.friends} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileMePage;
