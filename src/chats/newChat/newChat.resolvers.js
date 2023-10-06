import dbModel from "../../../db/model";
import { NEW_CHAT } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from 'graphql-subscriptions';

export default {
  Subscription: {
    newChat: {
      subscribe: async (_, { }, { loggedInUser }, info) => {
        return withFilter(
          () => pubsub.asyncIterator(NEW_CHAT),
          ({ newChat }, { }) => {
            console.log(newChat)
            console.log(loggedInUser._id)
            return true;
          }
        )(_, { }, { loggedInUser }, info);
      },
    },
  },
};
