import { differenceInYears, format } from "date-fns";
import { NextPage } from "next";
import { FaBirthdayCake } from "react-icons/fa";
import Card from "../../components/card";
import OnlineIndicator from "../../components/online-indicator";
import { useProfileMeQuery } from "../../graphql/generated";

const ProfileMePage: NextPage = () => {
  const meQuery = useProfileMeQuery()
  return <>
    <div className="p-10">
      {meQuery.data?.me &&
        <>
          <Card className="p-5 flex items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 font-bold text-white relative">
              {meQuery.data.me.name[0]}
              <OnlineIndicator size="lg" online={meQuery.data.me.online} />
            </div>
            <div className="ml-5">
              <h1 className="text-xl text-gray-100 mb-2">{meQuery.data.me.name}</h1>
              {meQuery.data.me.birthday &&
                <div className="flex items-center text-sm dark:text-gray-400">
                  <FaBirthdayCake />
                  <span className="ml-1">Geboren am {format(new Date(meQuery.data.me.birthday), 'dd.MM.yyyy')} ({differenceInYears(new Date(), new Date(meQuery.data.me.birthday))} Jahre alt)</span>
                </div>
              }
            </div>
          </Card>
          <div className="mt-4">
            <Card>
              <h2 className="px-5 pt-5 pb-2 dark:text-gray-200 text-lg">Freunde</h2>
              <ul>
                {meQuery.data.me.friends.map(friend => (
                  <li key={friend.id} className="flex px-5 py-3 items-center">
                    <div className="w-10 h-10 bg-blue-400 flex items-center justify-center text-white rounded-full">{friend.name[0]}</div>
                    <div className="ml-3 dark:text-gray-400">{friend.name}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      }
    </div>
  </>
}

export default ProfileMePage
