import express, { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken";

const router = Router();

router.use(express.json());

router.get("/auth/github", passport.authenticate("github", { session: false }));
router.get(
  "/auth/callback/github",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    const userID = (req.user as any)?._id;
    const authToken = jwt.sign(
      { id: userID },
      process.env.JWT_AUTH_SECRET || "backupsecret",
      { expiresIn: 600 }
    );

    const refreshToken = jwt.sign(
      { id: userID },
      process.env.JWT_REFRESH_SECRET || "backuprefreshsecret",
      { expiresIn: "30d" }
    );
    await RefreshToken.deleteMany({ user: userID });
    await RefreshToken.create({ user: userID, refreshToken: refreshToken });

    res.cookie("authToken", authToken, {
      expires: new Date(Date.now() + 300000),
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.redirect("http://localhost:3000/dashboard");
  }
);

router.get("/auth/token", async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  try {
    if (!(await RefreshToken.findOne({ refreshToken: refreshToken }))) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "backuprefreshsecret",
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const authToken = jwt.sign(
          { id: (user as any)?._id },
          process.env.JWT_AUTH_SECRET || "backupsecret",
          { expiresIn: "1h" }
        );

        res
          .cookie("authToken", authToken, {
            expires: new Date(Date.now() + 300000),
          })
          .sendStatus(200);
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
