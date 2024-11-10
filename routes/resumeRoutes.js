const express = require("express");
const saveResume = require("../controller/ResumeSaveController");
const router = express.Router();

router.use("/save-resume", saveResume);

module.exports = router;
