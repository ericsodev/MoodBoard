import express, { Router } from "express";
import passport from "passport";
import Entry from "../models/Entry";


const router = Router();
router.use(passport.authenticate("jwt", { session: false }));

router.get("/entries", async (req, res) => {
  const id = (req.user as any)?._id;
  if (
    typeof req.query.start !== "string" &&
    typeof req.query.end !== "string"
  ) {
    res.sendStatus(400);
  }
  const entries = await Entry.find({
    user: id,
    date: {
      $gte: new Date(Number(req.query.start)),
      $lte: new Date(Number(req.query.end)),
    },
  });
  res.json(entries);
});

router.post("/entry", async (req, res) => {
  const id = (req.user as any)?._id;
  const entry = await Entry.findOneAndUpdate(
    {
      user: id,
      date: req.body.date,
    },
    { $set: { mood: req.body.mood } },

    { upsert: true, new: true }
  );
  res.json(entry);
});

router.delete("/entry", async (req, res) => {
  const id = (req.user as any)?._id;
  const dateStart = new Date(req.body.date);
  const dateEnd = new Date(req.body.date);

  try {
    const entry = await Entry.findOneAndDelete({
      user: id,
      date: new Date(req.body.date).toDateString(),
    });

    if (entry) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
