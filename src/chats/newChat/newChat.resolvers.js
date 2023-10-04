import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from 'graphql-subscriptions';

export default {
  Subscription: {
    newChat: {
      subscribe: async (_, { roomId }, { loggedInUser }, info) => {
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ newMessage }, { roomId }) => {
            console.log(loggedInUser)
            //return newMessage.receiverId === loggedInUser._id && loggedInUser._id === receiverId;
            return 1
          }
        );
      },
    },
  },
};
