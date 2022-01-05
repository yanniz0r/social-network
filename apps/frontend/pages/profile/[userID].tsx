import { NextPage } from "next";
import Card from "../../components/card";
import { useProfileDetailPageQuery } from "../../graphql/generated";

interface UserDetailPageProps {
  userID: string;
}

const UserDetailPage: NextPage<UserDetailPageProps> = ({ userID }) => {
  const userDetailPageQuery = useProfileDetailPageQuery({
    variables: {
      userID,
    }
  })
  return <div className="p-10">
    <Card>
      {userID}
      {userDetailPageQuery.data?.user?.name}
    </Card>
  </div>
}

UserDetailPage.getInitialProps = (context) => {
  return {
    userID: context.query['userID'] as string
  }
}

export default UserDetailPage
