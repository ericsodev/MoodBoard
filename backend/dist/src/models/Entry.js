"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const entrySchema = new mongoose_2.Schema({
    user: { type: mongoose_2.Schema.Types.ObjectId, ref: "User" },
    mood: Number,
    date: Date,
});
entrySchema.index({ user: 1, date: 1 }, { unique: true });
const Entry = mongoose_1.default.model("Entries", entrySchema);
exports.default = Entry;
