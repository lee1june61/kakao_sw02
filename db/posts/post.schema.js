import { Schema, model } from "mongoose";

export const PostSchema = Schema(
  {
    title: { type: String, require: true, trim: true },
    postNumber: { type: Number, require: true }, // postNumber 는 schema가 생성될 경우 +1 씩 증가되어야 한다.
    text: { type: String, require: true, maxlength: 500 },
    writerNickname: { type: String, require: true },
    writer_id: { type: Schema.Types.ObjectId, ref: "user", require: true },
    recommend: { type: Number, require: true, default: 0 },
    share: { type: Number, require: true, default: 0 },
    Comment: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
  },
  { collection: "post", timestamps: true }
);

export const CommentSchema = Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    // 댓글의 글은 1개이므로 배열x
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  },
  { collection: "comment" }
);
