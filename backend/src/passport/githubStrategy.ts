import User from "../models/User";
import { Strategy as GithubStrategy } from "passport-github2";

const strategy = new GithubStrategy(
  {
    clientID: process.env.GIT_ID || "",
    clientSecret: process.env.GIT_SECRET || "",
    callbackURL: "http://localhost:5000/auth/callback/github",
  },
  function (accessToken: any, refreshToken: any, profile: any, done: any) {
    User.findOne({ id: profile.id }, function (err: any, user: any) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done("", user);
      } else {
        User.create({ nickname: profile.displayName, githubID: profile.id });
      }
    });
  }
);

export default strategy;
