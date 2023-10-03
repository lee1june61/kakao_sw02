require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils.js";
import { mongodb } from "../db/index.js";
import http from "http";
import logger from "morgan";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

(async () => {
  const PORT = process.env.PORT;
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
        };
      } else {
        const {
          connection: { context },
        } = ctx;
        return {
          loggedInUser: context.loggedInUser,
        };
      }
    },
    subscriptions: {
      onConnect: async ({ token }) => {
        if (!token) {
          throw new Error("please login to listen.");
        }
        const loggedInUser = await getUser(token);
        return {
          loggedInUser,
        };
      },
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    formatError: (err) => {
      console.log(err);
    },
  });

  const app = express();
  await mongodb();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(logger("tiny"));

  await apollo.start();

  apollo.applyMiddleware({ app });

  const httpServer = http.createServer(app);
    // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);
  
  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });
})();
