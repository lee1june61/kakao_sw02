import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createPost: async (_, { title, text, writerNickname, writer }, info) => {
      try {
        const res = await dbModel.post.create({
          title,
          text,
          writerNickname,
          writer,
        });
        console.dir(res);
        console.dir(info);
        console.dir(_);
        return {
          ok: true,
          Post: { title: "test", text: "test", writer: "test" },
        };
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          error: "글을 생성하지 못하였습니다.",
        };
      }
    },
  },
};
