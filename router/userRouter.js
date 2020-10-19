const express = require("express");
const router = express.Router();

const players = require("./../controller/userController");
const authCheck = require("./../middleware/auth");

router.get("/", players.getAllPlayers);
router.get("/:id", players.getIndividualPlayer);
router.post("/", players.createPlayer);

module.exports = router;
