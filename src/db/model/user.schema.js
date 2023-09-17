import { Schema, model } from "mongoose";

const userSchema = Schema({
  id: { type: Number, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, required: true, trim: true },
  affiliation: { type: String, required: true, enum: ["육군,해군,공군,육본"] },
  phonenumber: { type: String, required: true, trim: true },
  militarybase: { type: String, required: true },
});

export const userModel = model("User", userSchema);
