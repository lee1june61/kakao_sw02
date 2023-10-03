import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updatePost: protectedResolver(
      async (_, { postId, title, text, writerNickname }, { loggedInUser }) => {
        try {
          if (!(writerNickname === loggedInUser.nickname)) {
            throw "글쓴이와 로그인한 유저가 다릅니다.";
          }
          const offset = 1000 * 60 * 60 * 9;
          const now = new Date(new Date().getTime() + offset);
          const afterPost = await dbModel.post.findOneAndUpdate(
            { postId },
            { title, text, updatedAt: now },
            { new: true }
          );
          return {
            ok: true,
            message: `${afterPost.postId}번 글을 수정하였습니다.`,
            post: afterPost,
          };
        } catch (e) {
          console.error(e);
          return {
            ok: false,
            message: "해당 글을 업데이트 하지 못했습니다.",
          };
        }
      }
    ),
  },
};
