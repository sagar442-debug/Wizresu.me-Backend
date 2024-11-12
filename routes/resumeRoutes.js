const express = require("express");
const saveResume = require("../controller/ResumeSaveController");
const SaveResumePhoto = require("../controller/SaveResumePhoto");
const upload = require("../middleware/MulterMiddleware");
const router = express.Router();

router.post("/save-resume", saveResume);
router.post("/save-resume-photo", upload.single("file"), SaveResumePhoto);

module.exports = router;
