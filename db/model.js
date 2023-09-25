import { model } from "mongoose";
import UserSchema from "./user/user.schema";
import { CommentSchema, PostSchema } from "./posts/post.schema";
import { ChatSchema, RoomSchema } from "./chats/chat.schema";

const userModel = model("UserSchema", UserSchema);
const postModel = model("PostSchema", PostSchema);
const commentModel = model("CommentSchema", CommentSchema);
const chatModel = model("ChatSchema", ChatSchema);
const roomModel = model("RoomModel", RoomSchema);

const dbModel = {
  user: userModel,
  post: postModel,
  comment: commentModel,
  chat: chatModel,
  room: roomModel,
};

export default dbModel;
