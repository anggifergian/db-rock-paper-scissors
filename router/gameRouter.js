const express = require("express");
const router = express.Router();

const play = require("../controller/gameController");
const authCheck = require("./../middleware/auth");

router.post("/", authCheck, play.playGame);
router.get("/", authCheck, play.getAllRooms);
router.get("/getroom", authCheck, play.createRoom);
router.delete("/deleteroom/:id", authCheck, play.deleteRoom);

module.exports = router;
