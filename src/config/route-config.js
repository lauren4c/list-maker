module.exports = {
  init(app) {
    const listRoutes = require("../routes/lists");
    // const userRoutes = require("../routes/users");

    app.use(listRoutes);
    // app.use(userRoutes);
  }
};
