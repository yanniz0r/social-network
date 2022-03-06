import { NextPage } from "next";
import Container from "../components/container";
import CreatePostCard from "../components/create-post-card";
import PostCard from "../components/post-card";
import { useHomePageQuery } from "../graphql/generated";
import SignedInLayout from "../layouts/signed-in-layout";

const HomePage: NextPage = () => {
  const homePagePostsQuery = useHomePageQuery();
  return (
    <SignedInLayout navigationSpace contentSpace>
      <Container>
        <p className="mt-10 mb-5 text-5xl text-slate-900 dark:text-slate-100">Hallo, {homePagePostsQuery.data?.me.firstName}</p>
        <CreatePostCard onPost={() => homePagePostsQuery.refetch()} />
        {homePagePostsQuery.data?.posts?.map((post) => (
          <div className="mt-5" key={post.id}>
            <PostCard post={post} me={homePagePostsQuery.data?.me!} />
          </div>
        ))}
      </Container>
    </SignedInLayout>
  );
};

export default HomePage;
