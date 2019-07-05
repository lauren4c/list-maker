const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController");

router.get("/api/lists", listController.index);

module.exports = router;
