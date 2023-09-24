import { Schema, model } from "mongoose";

export const PostSchema = Schema(
  {
    title: { type: String, require: true, trim: true },
    content: { type: String, require: true, maxlength: 500, trim: true },
    writer: { type: String, require: true },
    recommand: { type: Number, require: true, default: 0 },
    share: { type: Number, require: true, default: 0 },
    Comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
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

