import { protectedResolver } from "../../users/users.utils";
import dbModel from "../../../db/model";

export default {
  Query: {
    getChats: protectedResolver(async (_, { recieverId, lastId }, { loggedInUser }) => {
      try {
        const page = Number(lastId || 1); // 현재페이지
        const perPage = 10; // 페이지 당 게시글 수
        const query = { reciever : recieverId };
        const sort = { updatedAt: -1 }

        const chats = await dbModel.chat.find(query)
        .sort(sort)
        .populate([
          {
            path: "receiver",
            select: ["armynumber"]
          },
          {
            path: "sender",
            select: ["armynumber"]
          }
        ])
        .skip(perPage * (page - 1))
        .limit(perPage);
        return {
          ok: true,
          chats: chats,
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