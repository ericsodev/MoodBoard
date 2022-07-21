"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const passport_github2_1 = require("passport-github2");
const strategy = new passport_github2_1.Strategy({
    clientID: process.env.GIT_ID || "",
    clientSecret: process.env.GIT_SECRET || "",
    callbackURL: "http://localhost:5000/auth/callback/github",
}, function (accessToken, refreshToken, profile, done) {
    User_1.default.findOne({ id: profile.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done("", user);
        }
        else {
            User_1.default.create({ nickname: profile.displayName, githubID: profile.id });
        }
    });
});
exports.default = strategy;
