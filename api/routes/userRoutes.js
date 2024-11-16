// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { UserSave } = require("../controller/UserSave");
const getUserDetails = require("../controller/GetUserResumes");

router.post("/save-user", UserSave);
router.get("/get-user", getUserDetails);

module.exports = router;
