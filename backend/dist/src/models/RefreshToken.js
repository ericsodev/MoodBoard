"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const refreshTokenSchema = new mongoose_2.Schema({
    user: { type: mongoose_2.Schema.Types.ObjectId, ref: "User" },
    refreshToken: String,
});
const RefreshToken = mongoose_1.default.model("RefreshToken", refreshTokenSchema);
exports.default = RefreshToken;
