require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils.js";
import { mongodb } from "./db/index.js";
import http from "http";
import logger from "morgan";

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
    formatError: (err) => {
      console.log(err);
    },
  });

  const app = express();
  await mongodb();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/healthcheck", require("express-healthcheck")());

  app.use(logger("tiny"));

  await apollo.start();

  apollo.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  // apollo.installSubscriptionHandlers(httpServer); -> v3에서는 지원x

  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });
})();
