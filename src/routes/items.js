const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.post("/api/lists/:id/items/new", itemController.create);
router.post("/api/lists/:id/items/:id/delete", itemController.destroy);
router.post("/api/lists/:id/items/:id/edit", itemController.update);

module.exports = router;
