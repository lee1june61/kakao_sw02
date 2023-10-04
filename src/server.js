require("dotenv").config();
import express from "express";
import logger from "morgan";
const { ApolloServer } = require("@apollo/server");
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import http from "http";
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
import { mongodb } from "../db/index.js";
const { makeExecutableSchema } = require("@graphql-tools/schema");

const PORT = process.env.PORT;

const app = express();

app.use('/healthcheck', require('express-healthcheck')());

app.use(logger("tiny"));

app.use(cors());

const schema = makeExecutableSchema({ typeDefs, resolvers });
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const wsServerCleanup = useServer({ 
  schema,
  context: async (ctx) => {
    if (!ctx.connectionParams.token) {
      throw new Error("please login to listen.");
    }
    const loggedInUser = await getUser(ctx.connectionParams.token);
    return {
      loggedInUser,
    };
  },
 }, 
 wsServer
);

mongodb();

const apollo = new ApolloServer({
  schema,
  formatError: (err) => {
    console.log(err);
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
          },
        };
      },
    },
  ],
});

(async function () {
  await apollo.start();
  app.use("/graphql", bodyParser.json(), expressMiddleware(apollo, {
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
        }
      }
    },
  }));
})();

httpServer.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});