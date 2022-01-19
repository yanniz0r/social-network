import { ApolloServer } from "apollo-server-express";
import { Logger } from "tslog";
import express from "express";
import { Context } from "./context";
import resolvers from "./graphql/resolvers";
import imageRouter from "./routes/image";
import { graphqlUploadExpress } from "graphql-upload";
import schema from "@social/schema";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";

const logger = new Logger({ name: "apollo-server" });

async function start() {
  const apolloServer = new ApolloServer({
    resolvers: resolvers,
    typeDefs: schema,
    context(express) {
      return express.req.context;
    },
  });

  const app = express();

  app.use(cookieParser())

  app.use(async (req, res, next) => {
    req.context = await Context.init(req, res);
    
    const authenticationCookie = req.context.getCookie('authentication')
    if (authenticationCookie) {
      logger.debug("Sent cookie", authenticationCookie)
      await req.context.authorizationService.authenticateUser(authenticationCookie)
    }

    next();
  });

  app.use(
    cors(config.get('Common.cors'))
  );

  app.use(graphqlUploadExpress());

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app, 
    cors: config.get('Common.cors')
  });

  app.listen({ port: 4000 }, () => {
    logger.info(`🚀 Server ready`);
  });

  app.use(imageRouter);
}

start();
