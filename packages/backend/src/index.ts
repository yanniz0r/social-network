import { ApolloServer } from "apollo-server";
import { Logger } from 'tslog'
import resolvers from "./graphql/resolvers";
import schema from "./graphql/schema";

const logger = new Logger({ name: 'apollo-server' })

const apolloServer = new ApolloServer({
  resolvers: resolvers,
  typeDefs: schema,
})

apolloServer.listen().then((serverInfo) => {
  logger.info('Server started at', serverInfo.url)
})