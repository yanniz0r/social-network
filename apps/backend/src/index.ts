import { ApolloServer } from "apollo-server-express";
import { Logger } from "tslog";
import express from "express";
import { Context } from "./context";
import resolvers from "./graphql/resolvers";
import imageRouter from "./routes/image";
import { graphqlUploadExpress } from "graphql-upload";
import schema from "@social/schema";
import cors from "cors";

const logger = new Logger({ name: "apollo-server" });

async function start() {
  const apolloServer = new ApolloServer({
    resolvers: resolvers,
    typeDefs: schema,
    context(express) {
      return express.req.context
    },
  });
  
  const app = express();

  app.use(async (req, _res, next) => {
    req.context = await Context.init()
    next()
  })

  app.use(cors())
  
  app.use(graphqlUploadExpress());
  
  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    logger.info(`🚀 Server ready`);
  });

  app.use(imageRouter)
}  

start()
