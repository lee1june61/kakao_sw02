import { Schema, model } from "mongoose";
export const PostSchema = Schema(
  {
    title: { type: String, require: true, trim: true },
    postId: { type: Number, require: true, unique: true }, // postId 는 schema가 생성될 경우 +1 씩 증가되어야 한다.
    text: { type: String, require: true, maxlength: 500 },
    writerNickname: { type: String, require: true },
    writerId: { type: Schema.Types.ObjectId, ref: "user", require: true },
    recommend: { type: Number, require: true, default: 0 },
    share: { type: Number, require: true, default: 0 },
    commentCnt: { type: Number, require: true, default: 0 },
  },
  { collection: "post", timestamps: true }
);

export const CommentSchema = Schema(
  {
    text: { type: String, require: true },
    writerNickname: { type: String, require: true },
    writerId: { type: Schema.Types.ObjectId, ref: "user", require: true },
    // 댓글의 글은 1개이므로 배열x
    postId: { type: Number, ref: "post", require: true },
  },
  { collection: "comment", timestamps: true }
);
