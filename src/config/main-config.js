require("dotenv").config();
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const passportConfig = require("./passport-config");

module.exports = {
  init(app, express) {
    app.use(logger("dev"));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(expressValidator());
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1.21e9 } //set cookie to expire in 14 days
      })
    );
    passportConfig.init(app);

    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });
  }
};
