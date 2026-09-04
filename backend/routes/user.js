const { Router } = require("express");

const router = Router();

const User = require("../models/user");

const { createTokenForUser } = require("../services/authentication");

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await User.create({
    fullName,
    email,
    password,
  });
  const token = createTokenForUser(user);
  return res
    .cookie("token", token)
    .status(201)
    .redirect("http://localhost:5173/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassWordAndGenerateToken(email, password);
    res.cookie("token", token).redirect("http://localhost:5173/");
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
