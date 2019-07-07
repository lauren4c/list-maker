module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 6 });
    }

    const errors = req.validationErrors();
    if (errors) {
      res.json({ errors });
    } else {
      return next();
    }
  }
};
