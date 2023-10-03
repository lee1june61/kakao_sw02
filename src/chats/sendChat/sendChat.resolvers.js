import { protectedResolver } from "../../users/users.utils";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import dbModel from "../../../db/model";

export default {
  Mutation: {
    sendChat: protectedResolver(async (_, { recieverId, text }, { loggedInUser }) => {
      try {
        const reciever = await dbModel.user.findOne({
          $id: recieverId
        })
        if (!reciever){
          return {
            ok: false,
            error: "reciever doesn't exist"
          }
        }

        const sendedChat = await dbModel.chat.create({
          reciever: {
            $ref: 'user',
            _id: recieverId
          },
          sender: {
            $ref: 'user',
            _id: loggedInUser._id
          },
          text: text
        })

        console.log(sendedChat)
        
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