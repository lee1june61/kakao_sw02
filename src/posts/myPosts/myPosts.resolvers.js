import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    myPosts: protectedResolver(
      async (_, { writerNickname }, { loggedInUser }) => {
        try {
          if (!writerNickname === loggedInUser.nickname) {
            throw "사용자 게시물이 아닙니다.";
          }
          const posts = await dbModel.post.find({ writerNickname });
          return {
            ok: true,
            message: "해당 사용자의 게시물을 가져왔습니다.",
            posts,
          };
        } catch (error) {
          console.error(e);
          return {
            ok: false,
            message: "해당하는 게시물은 존재하지 않습니다.",
          };
        }
      }
    ),
  },
};
