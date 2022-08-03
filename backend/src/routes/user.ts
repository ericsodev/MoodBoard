import express, { Router } from "express";
import passport from "passport";
import User from "../models/User";

const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.get("/", async (req, res) => {
  const id = (req.user as any)?._id;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      res.sendStatus(404);
    }
    res.json({ nickname: user?.nickname });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const id = (req.user as any)?._id;

  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      res.sendStatus(404);
    }
    if (!req.body.nickname) {
      res.sendStatus(400);
    }
    user?.update({ nickname: req.body.nickname });
    user?.save();
    res.json({ nickname: user?.nickname });
  } catch (err) {
    console.log(err);
  }
});

export default router;
