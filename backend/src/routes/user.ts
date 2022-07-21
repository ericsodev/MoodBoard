import express, { Router } from "express";
import passport from "passport";
import User from "../models/User";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", async (req, res) => {
  const id = (req.user as any)?._id;
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      res.json({ nickname: user.nickname });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
