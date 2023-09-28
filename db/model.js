import { model } from "mongoose";
import UserSchema from "./user/user.schema";
import { CommentSchema, PostSchema } from "./posts/post.schema";
import { ChatSchema, RoomSchema } from "./chats/chat.schema";
import { CounterSchema } from "./counter/counter.schema";

const userModel = model("Users", UserSchema);
const postModel = model("Posts", PostSchema);
const commentModel = model("Comments", CommentSchema);
const chatModel = model("Chats", ChatSchema);
const roomModel = model("Rooms", RoomSchema);
const counterModel = model("Counter", CounterSchema);

const dbModel = {
  user: userModel,
  post: postModel,
  comment: commentModel,
  chat: chatModel,
  room: roomModel,
  counter: counterModel,
};

export default dbModel;
