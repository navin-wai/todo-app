const { Router } = require("express");
const { validateToken } = require("../services/authentication");

const router = Router();

router.get("/me", async (req, res) => {
  try {
    const user = await validateToken(req.cookies.token);

    if (!user) {
      return res.status(401).json({
        authenticated: false,
      });
    }

    return res.json({
      authenticated: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
    });
  }
});

module.exports = router;
