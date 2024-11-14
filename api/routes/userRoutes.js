// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { UserSave } = require("../controller/UserSave");

router.post("/save-user", UserSave);

module.exports = router;
