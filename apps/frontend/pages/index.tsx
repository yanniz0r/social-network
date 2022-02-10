import { NextPage } from "next";
import Container from "../components/container";
import CreatePostCard from "../components/create-post-card";
import PostCard from "../components/post-card";
import { useHomePagePostsQuery } from "../graphql/generated";

const HomePage: NextPage = () => {
  const homePagePostsQuery = useHomePagePostsQuery();
  return (
    <>
      <Container>
        <CreatePostCard onPost={() => homePagePostsQuery.refetch()} />
      </Container>
      <Container>
        {homePagePostsQuery.data?.posts?.map((post) => (
          <div className="mb-5" key={post.id}>
            <PostCard post={post} me={homePagePostsQuery.data?.me!} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default HomePage;
