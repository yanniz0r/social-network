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
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const logger = new Logger({ name: "apollo-server" });

async function start() {
  const app = express();
  const httpServer = createServer(app)

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers,
      }),
      async subscribe(executionContext) {
        logger.info('Client subscribed via websockets')
        const contextValue = await Context.init()
        await contextValue.authorizationService.authenticateUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWUyZDEwMjIyZTZkYmY4YjI4ZTI3NWEiLCJpYXQiOjE2NDI2MjE0NDB9.HL4otW7I5C4kIv_tCgAXkIEsIuLXEAFCFyGKtdblKts')
        return subscribe({
          ...executionContext,
          contextValue: contextValue,
        })
      },
      async execute(executionArgs) {
        logger.info('Client subscribed via websockets')
        const contextValue = await Context.init()
        await contextValue.authorizationService.authenticateUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWUyZDEwMjIyZTZkYmY4YjI4ZTI3NWEiLCJpYXQiOjE2NDI2MjE0NDB9.HL4otW7I5C4kIv_tCgAXkIEsIuLXEAFCFyGKtdblKts')
        return execute({
          ...executionArgs,
          contextValue
        })
      },
    }, {
      server: httpServer,

    }
  )

  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs: schema,
    context(express) {
      return express.req.context;
    },
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });

  app.use(cookieParser());

  app.use(async (req, res, next) => {
    req.context = await Context.init(req, res);

    const authenticationCookie = req.context.getCookie("authentication");
    if (authenticationCookie) {
      await req.context.authorizationService.authenticateUser(
        authenticationCookie
      );
    }

    next();
  });

  app.use(cors(config.get("Common.cors")));

  app.use(graphqlUploadExpress());

  await apolloServer.start();

  app.use(imageRouter);

  apolloServer.applyMiddleware({
    app,
    cors: config.get("Common.cors"),
  });

  httpServer.listen({ port: 4000 }, () => {
    logger.info(`🚀 Server ready`);
  });
}

start();
