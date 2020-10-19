const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRouter"));
router.use("/players", require("./userRouter"));
router.use("/game", require("./gameRouter"));

module.exports = router;
