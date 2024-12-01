const express = require("express");
const saveResume = require("../controller/ResumeSaveController");
const SaveResumePhoto = require("../controller/SaveResumePhoto");
const upload = require("../middleware/MulterMiddleware");
const verifyUserMiddleware = require("../middleware/VerifyUserMiddleware");
const getResumeDetails = require("../controller/GetResumeDetails");
const UpdateResume = require("../controller/UpdateResume");
const DeleteResume = require("../controller/DeleteResume");
const router = express.Router();

router.post("/save-resume", saveResume);
router.post("/save-resume-photo", upload.single("file"), SaveResumePhoto);
router.get("/detail", getResumeDetails);
router.put("/update-resume", UpdateResume);
router.delete("/delete-resume", DeleteResume);

module.exports = router;
