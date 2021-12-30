import { NextPage } from "next";
import PostCard from "../components/post-card";
import { useHomePagePostsQuery } from "../graphql/generated";

const HomePage: NextPage = () => {
  const homePagePostsQuery = useHomePagePostsQuery();
  return (
    <div className="p-10">
      {homePagePostsQuery.data?.posts?.map((post) => (
        <div className="mb-5" key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
