import { Schema, model } from "mongoose";

export const ChatSchema = Schema(
  {
    receiver: { type: Schema.Types.ObjectId, ref: "user", require: true },
    sender: { type: Schema.Types.ObjectId, ref: "user", require: true },
    text: { type: String, require: true, maxlength: 500 },
    create_at: { type: Date, default: Date.now() },
  },
  { collection: "chat" }
);

export const RoomSchema = Schema(
  {
    counselor: { type: Schema.Types.ObjectId, ref: "user", require: true },
    client: { type: Schema.Types.ObjectId, ref: "user", require: true },
    create_at: { type: Date, default: Date.now() },
    update_at: { type: Date, default: Date.now() },
    chats: [{ type: Schema.Types.ObjectId, ref: "chat" }],
  },
  { collection: "room" }
);

RoomSchema.virtual("roomId").get(function () {
  return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
});
