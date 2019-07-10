const User = require("../db/models").User;
const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    };
    User.findOne({ where: { email: newUser.email } }).then(user => {
      if (user) {
        res.json({
          message:
            'This email is already in use. Please use the "sign-in" button'
        });
      } else {
        userQueries.createUser(newUser, (err, user) => {
          if (err) {
            res.json({ message: err });
          } else {
            passport.authenticate("local")(req, res, () => {
              res.json({ user, message: "You have successfully signed up." });
            });
          }
        });
      }
    });
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      if (!req.user) {
        res.json({
          message:
            "Sign in failed. If you're new here, use the 'sign up' button to create your account."
        });
      } else {
        User.findOne({ where: { email: req.body.email } }).then(user => {
          res.json({ user, message: "You've successfully signed in!" });
        });
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    res.json({ message: "You've successfully signed out!" });
  }
};
