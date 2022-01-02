import { NextPage } from "next";
import Card from "../../components/card";
import { useProfileMeQuery } from "../../graphql/generated";

const ProfileMePage: NextPage = () => {
  const meQuery = useProfileMeQuery()
  return <>
    <div className="p-10">
      {meQuery.data?.me &&
        <Card className="p-5 flex items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 font-bold text-white">
            {meQuery.data.me.name[0]}
          </div>
          <div className="ml-5">
            <h1 className="text-xl text-gray-100">{meQuery.data.me.name}</h1>
          </div>
        </Card>
      }
    </div>
  </>
}

export default ProfileMePage
