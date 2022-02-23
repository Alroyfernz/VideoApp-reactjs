const router = require("express").Router();
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
  (req, res) => {
    res.send("google auth");
  }
);
router.get("/login/success", async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies,
      });
    } else {
      res.json("no req");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/login/userInfo", async (req, res) => {
  try {
    console.log(req.session);
    return res.status(200).json(req.session);
  } catch (error) {
    console.log(error);
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
    successRedirect: "http://localhost:3000/",
  })
  // function (req, res) {
  //   if (req.user) {
  //     // res.redirect("http://localhost:3000/");
  //     req.session = req.user;
  //     return res.status(200).json({
  //       success: true,
  //       message: "successfull",
  //       user: req.user,
  //       cookies: req.cookies,
  //     });
  //   }
  // }
);

module.exports = router;
