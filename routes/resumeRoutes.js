const express = require("express");
const saveResume = require("../controller/ResumeSaveController");
const router = express.Router();

router.use("/save-resume", saveResume);
router.use("/save-resume-photo", () => {
  console.log("Saved resume photo");
});

module.exports = router;
