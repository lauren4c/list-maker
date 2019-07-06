module.exports = {
  init(app) {
    const listRoutes = require("../routes/lists");
    const itemRoutes = require("../routes/items");

    // const userRoutes = require("../routes/users");

    app.use(listRoutes);
    app.use(itemRoutes);

    // app.use(userRoutes);
  }
};
