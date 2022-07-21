import mongoose from "mongoose";
import { Schema } from "mongoose";

const entrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  mood: Number,
  date: Date,
});

entrySchema.index({ user: 1, date: 1 }, { unique: true });

const Entry = mongoose.model("Entries", entrySchema);

export default Entry;
