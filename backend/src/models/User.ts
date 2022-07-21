import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  nickname: String,
  githubID: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;
