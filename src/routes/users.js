const express = require("express");
const validation = require("./validation");

const router = express.Router();
const userController = require("../controllers/userController");

router.post("/api/users", userController.create);
router.post(
  "/api/users/sign_in",
  validation.validateUsers,
  userController.signIn
);
router.get("/api/users/sign_out", userController.signOut);

module.exports = router;
