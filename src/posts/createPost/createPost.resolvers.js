import dbModel from "../../../db/model";
import { protectedResolver } from "../../users/users.utils";
import { getPostId } from "../posts.utils";

export default {
  Mutation: {
    createPost: protectedResolver(
      async (_, { title, text, writerNickname }, { loggedInUser }) => {
        try {
          console.log("1");
          if (!(writerNickname === loggedInUser.nickname)) {
            throw "로그인한 계정과 작성하는 글쓴이가 다릅니다.";
          }
          const writer_id = loggedInUser._id; // 현재 로그인한 유저의 _id값
          const postId = await getPostId();
          const post = await dbModel.post.create({
            title,
            text,
            writerNickname,
            postId,
            writer_id,
          });

          return {
            ok: true,
            message: `${post.title} 을 생성하였습니다.`,
          };
        } catch (e) {
          console.error(e);
          return {
            ok: false,
            error: "글을 생성하지 못하였습니다.",
          };
        }
      }
    ),
  },
};
