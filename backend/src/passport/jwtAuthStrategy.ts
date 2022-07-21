import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_AUTH_SECRET || "backupsecret",
  },
  function (jwt_payload, done) {
    const user = User.findOne({ id: jwt_payload.id }, (err: any, user: any) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
);

export default strategy;
