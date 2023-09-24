import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "apollo-server";

export default {
  Subscription: {
    newChat: {
      subscribe: async (_, { loggedInUser }, info) => {
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ newMessage }, { receiverId }) => {
            return newMessage.receiverId === loggedInUser._id;
          }
        )(_, { receiverId }, { loggedInUser }, info);
      },
    },
  },
};
