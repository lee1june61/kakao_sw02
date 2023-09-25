import dbModel from "../../../db/model";

export default {
  Mutation: {
    deletePost: async (_, { postNumber, writerNickname }, info) => {
      try {
        const post = await dbModel.post.findOneAndDelete(postNumber, writerNickname);
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
    },
  },
};
