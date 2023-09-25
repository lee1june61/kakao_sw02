import { protectedResolver } from "../../users/users.utils";
import dbModel from "../../../db/model";

export default {
  Query: {
    getChatrooms: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const page = Number(lastId || 1); // 현재페이지
        const perPage = 10; // 페이지 당 게시글 수
        const query = { client: loggedInUser._id };

        const chats = await dbModel.room.find(query,options)
        .populate([
          {
            path: "chat",
            select: [],
            sort: {createdAt: -1}
          },
          {
            path: "counselor",
            select: []
          }
        ])
        .skip(perPage * (page - 1))
        .limit(perPage);


        return {
          ok: true,
          myRooms: rooms,
        }
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