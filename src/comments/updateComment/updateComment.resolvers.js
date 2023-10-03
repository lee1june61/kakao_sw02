import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateComment: protectedResolver(
      async (_, { _id, text, nickname }, { loggedInUser }) => {
        try {
          if (!(nickname === loggedInUser.nickname)) {
            throw "댓글을 작성한 사용자가 아닙니다.";
          }
          const offset = 1000 * 60 * 60 * 9;
          const now = new Date(new Date().getTime() + offset);
          const afterPost = await dbModel.comment.findOneAndUpdate(
            { _id },
            { text, updatedAt: now },
            { new: true }
          );

          return {
            ok: true,
            message: "댓글이 수정되었습니다..",
            updatedAt: afterPost.updatedAt,
          };
        } catch (e) {
          return {
            ok: false,
            message: "댓글이 수정되지 않았습니다.",
          };
        }
      }
    ),
  },
};
