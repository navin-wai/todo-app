const { Router } = require("express");

const router = Router();

const User = require("../models/user");

const { createTokenForUser } = require("../services/authentication");
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

function sendAuthSuccess(req, res, token, message) {
  const response = res.cookie("token", token);

  if (req.get("Sec-Fetch-Mode") === "navigate") {
    return response.redirect(`${FRONTEND_URL}/`);
  }

  return response.json({ message });
}

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await User.create({
    fullName,
    email,
    password,
  });
  const token = createTokenForUser(user);
  return sendAuthSuccess(req, res.status(201), token, "Account created successfully");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassWordAndGenerateToken(email, password);
    return sendAuthSuccess(req, res, token, "Signed in successfully");
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
