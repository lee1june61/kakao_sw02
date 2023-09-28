import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { _id, nickname }, { loggedInUser }) => {
        try {
          if (!(nickname === loggedInUser.nickname)) {
            throw "댓글을 작성한 사용자가 아닙니다.";
          }
          const { postId } = await dbModel.comment
            .findByIdAndDelete({
              _id,
            })
            .exec();
          await dbModel.post.findOneAndUpdate(
            { postId },
            { $inc: { commentCnt: -1 } }
          );
          return {
            ok: true,
            message: "댓글이 삭제되었습니다.",
          };
        } catch (e) {
          console.error(e);
          return {
            ok: false,
            message: "댓글이 삭제되지 않았습니다.",
          };
        }
      }
    ),
  },
};
