"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const githubStrategy_1 = __importDefault(require("./githubStrategy"));
const jwtAuthStrategy_1 = __importDefault(require("./jwtAuthStrategy"));
passport_1.default.use("github", githubStrategy_1.default);
passport_1.default.use("jwt", jwtAuthStrategy_1.default);
exports.default = passport_1.default;
