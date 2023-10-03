import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePost: protectedResolver(
      async (_, { postId, writerNickname }, { loggedInUser }) => {
        try {
          if (!(loggedInUser.nickname === writerNickname)) {
            throw "작성한 유저가 아닙니다.";
          }
          const post = await dbModel.post.findOneAndDelete({ postId });
          const postComment = await dbModel.comment.findOneAndDelete({
            postId,
          });
          if (postComment) {
            throw "댓글이 존재합니다.";
          }
          return {
            ok: true,
            message: `"${post.title}" 게시물을 삭제하였습니다.`,
          };
        } catch (e) {
          console.error(e);
          return {
            ok: false,
            message: `해당 게시물을 삭제하지 못하였습니다.`,
          };
        }
      }
    ),
  },
};
