import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from 'graphql-subscriptions';

export default {
  Subscription: {
    newChat: {
      subscribe: async (_, { loggedInUser }, info) => {
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ newMessage }) => {
            return newMessage.receiverId === loggedInUser._id;
          }
        )(_, { loggedInUser }, info);
      },
    },
  },
};
