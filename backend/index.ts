import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/auth";
import moodRouter from "./src/routes/moods";
import userRouter from "./src/routes/user";
import passport from "./src/passport";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = 5000;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/", authRouter);
app.use("/api", moodRouter);
app.use("/user", userRouter);
mongoose.connect(process.env.MONGO_REMOTE_URL || "").then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
