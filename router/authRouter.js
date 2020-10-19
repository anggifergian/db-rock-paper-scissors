const express = require("express");
const router = express.Router();

const auth = require("./../controller/authController");
const authCheck = require("./../middleware/auth");

router.post("/login", auth.login);
router.get("/whoami", authCheck, auth.whoami);

module.exports = router;
