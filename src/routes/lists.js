const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController");

router.get("/api/lists", listController.index);
router.post("/api/lists/new", listController.create);
router.get("/api/lists/:id", listController.show);
router.post("/api/lists/:id/delete", listController.destroy);
router.post("/api/lists/:id/edit", listController.update);

module.exports = router;
