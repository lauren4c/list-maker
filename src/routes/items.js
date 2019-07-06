const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get(`/api/lists/:id/items`, itemController.index);
