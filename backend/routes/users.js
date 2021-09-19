var express = require("express");
var router = express.Router();
const passport = require("passport");
const authenticate = require("../authenticate");
const User = require("../models/user");
const Profile = require("../models/profile");
// var cookieParser = require('cookie-parser');

const atob = require("atob");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    user.validate((err) => {
      if (err) {
        res.json({ err: err });
      }
    });
    User.register(user, req.body.password, async (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        user.username = req.body.username;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        passport.authenticate("local")(req, res, () => {
          const token = authenticate.getToken({
            _id: req.user._id,
            username: req.user.username,
          });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.cookie("token", token, { httpOnly: true });
          res.json({
            success: true,
            token: token,
            user: req.user.username,
            status: "Registration Successful!",
          });
        });
      }
      // save name and email info to profile database
      var profile = new Profile({
        username: req.body.username,
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
      });
      await profile.save();
    });
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ err: err });
    return;
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({
    _id: req.user._id,
    username: req.user.username,
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.cookie("token", token, {
    exp: new Date(Date.now() + process.env.JWT_EXPIRATION_NUM),
    httpOnly: true,
  });
  res.json({
    success: true,
    token: token,
    user: req.user.username,
    status: "You are successfully logged in!",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/auth", (req, res, next) => {
  if (req.cookies.token) {
    let user = req.cookies.token.split(".")[1];
    var decodedUser = JSON.parse(atob(user));
    res.json({
      loggedIn: true,
      user: decodedUser.username,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
});

module.exports = router;
