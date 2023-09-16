import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: Int32Array, required: true, unique: true, lowercase: true },
  identity: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  affiliation: { type: String, required: true, enum: ["육군,해군,공군,육본"] },
  phonenumber: { type: String, required: true, trim: true },
  militarybase: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
