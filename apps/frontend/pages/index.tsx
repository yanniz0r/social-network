import { NextPage } from "next";
import CreatePostCard from "../components/create-post-card";
import PostCard from "../components/post-card";
import { useHomePagePostsQuery } from "../graphql/generated";

const HomePage: NextPage = () => {
  const homePagePostsQuery = useHomePagePostsQuery();
  return (
    <>
      <div className="p-10 pb-5">
        <CreatePostCard onPost={() => homePagePostsQuery.refetch()} />
      </div>
      <div className="p-10">
        {homePagePostsQuery.data?.posts?.map((post) => (
          <div className="mb-5" key={post.id}>
            <PostCard post={post} me={homePagePostsQuery.data?.me!} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
