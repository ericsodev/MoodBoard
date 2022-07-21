import passport from "passport";
import GithubStrategy from "./githubStrategy";
import JWTAuthStrategy from "./jwtAuthStrategy";

passport.use("github", GithubStrategy);
passport.use("jwt", JWTAuthStrategy);
export default passport;
