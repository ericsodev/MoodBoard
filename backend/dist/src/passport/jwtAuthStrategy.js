"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../models/User"));
const strategy = new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_AUTH_SECRET || "backupsecret",
}, function (jwt_payload, done) {
    const user = User_1.default.findOne({ id: jwt_payload.id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
});
exports.default = strategy;