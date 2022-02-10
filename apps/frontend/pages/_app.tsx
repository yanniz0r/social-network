import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { AppProps } from "next/app";
import Navigation from "../components/navigation";
import "../styles/globals.css";

const uploadLink = () =>
  createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

const websocketLink = () =>
  split(
    (operation) => {
      const mainDefinition = getMainDefinition(operation.query);
      return (
        mainDefinition.kind === "OperationDefinition" &&
        mainDefinition.operation === "subscription"
      );
    },
    new WebSocketLink({
      uri: "ws://localhost:4000/subscriptions",
      options: {
        reconnect: true,
      },
    }),
    uploadLink()
  );

const isServer = typeof window === "undefined";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: isServer ? uploadLink() : websocketLink(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <ApolloProvider client={apolloClient}>
        <div className="flex">
          <Navigation />
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
