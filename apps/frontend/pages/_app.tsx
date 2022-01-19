import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { AppProps } from "next/app";
import Navigation from "../components/navigation";
import "../styles/globals.css";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: 'include'
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ApolloProvider client={apolloClient}>
        <>
          <Navigation />
          <Component {...pageProps} />
        </>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
