import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getPost: protectedResolver(async (_, { postId }, { loggedInUser }) => {
      try {
        const post = await dbModel.post.findOne({ postId }).exec();

        return {
          ok: true,
          message: `${post.postId}번 글을 가져왔습니다.`,
          post,
        };
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          message: "해당 게시물은 존재하지 않습니다.",
        };
      }
    }),
  },
};
