const router = require("express").Router();
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
  (req, res) => {
    res.send("google auth");
  }
);
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get("/login/failure", (req, res) => {
  res.status(404).json({
    success: false,
    message: "failure",
  });
});
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failure",
  }),
  function (req, res) {
    if (req.user) {
      res.redirect("http://localhost:3000/");
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies,
      });
    }
  }
);

module.exports = router;
