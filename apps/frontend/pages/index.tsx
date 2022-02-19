import { NextPage } from "next";
import Container from "../components/container";
import CreatePostCard from "../components/create-post-card";
import PostCard from "../components/post-card";
import { useHomePagePostsQuery } from "../graphql/generated";
import SignedInLayout from "../layouts/signed-in-layout";

const HomePage: NextPage = () => {
  const homePagePostsQuery = useHomePagePostsQuery();
  return (
    <SignedInLayout>
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
    </SignedInLayout>
  );
};

export default HomePage;
