import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    myComment: protectedResolver(
      async (_, { writerNickname }, { loggedInUser }) => {
        try {
          if (!(loggedInUser.nickname === writerNickname)) {
            throw "작성자가 아닙니다.";
          }
          const comment = await dbModel.comment
            .findOne({ writerNickname })
            .exec();
          return {
            ok: true,
            message: `${comment.postId}번 글의 댓글을 가져왔습니다.`,
            comment,
          };
        } catch (e) {
          console.error(e);
          return {
            ok: false,
            message: "해당 게시물의 댓글은 존재하지 않습니다.",
          };
        }
      }
    ),
  },
};
