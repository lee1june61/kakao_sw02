//import { protectedResolver } from "../../users/users.utils";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { recieverId, text }, { loggedInUser }) => {
      try {
        
        const sendedChat = ""

        
        pubsub.publish(NEW_MESSAGE, { newMessage: { ...sendedChat } });
        return {
          ok: true,
          message: sendedChat,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant send message",
        };
      }
    }),
  },
};