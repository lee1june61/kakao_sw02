import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    allPosts: protectedResolver(async (args, context, info) => {
      try {
        const posts = await dbModel.post.find({});
        return {
          ok: true,
          message: "Post의 글을 전부 찾았습니다.",
          posts: posts,
        };
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          message: "Post의 글을 찾지못하였습니다.",
        };
      }
    }),
  },
};
