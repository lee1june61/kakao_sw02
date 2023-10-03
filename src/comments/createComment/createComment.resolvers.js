import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { postId, text }, { loggedInUser }) => {
        try {
          const { nickname, _id } = loggedInUser;

          const comment = await dbModel.comment.create({
            postId,
            text,
            writerNickname: nickname,
            writerId: _id,
          });
          await dbModel.post.findOneAndUpdate(
            { postId },
            { $inc: { commentCnt: 1 } }
          );
          return {
            ok: true,
            message: `${comment.postId}번 댓글이 작성되었습니다.`,
          };
        } catch (e) {
          console.error(e);
          return {
            ok: false,
            message: "댓글이 작성되지 않았습니다.",
          };
        }
      }
    ),
  },
};
