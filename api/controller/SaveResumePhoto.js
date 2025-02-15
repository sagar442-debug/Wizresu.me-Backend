const { s3, PutObjectCommand, bucketName } = require("../config/s3Config");
const crypto = require("crypto");
const ImageCompressor = require("../config/ImageCompressor");
const User = require("../models/User");
const Resume = require("../models/ResumeModel");

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const SaveResumePhoto = async (req, res) => {
  const { clerkId, resumeId } = req.body;
  const compressedImage = await ImageCompressor(req.file.buffer);
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resume = await Resume.findOne({ _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    // Creating params for the bucket inorder to upload the file with correct info and properties
    const params = {
      Bucket: bucketName,
      Key: randomImageName() + ".png",
      Body: compressedImage,
      ContentType: req.file.mimeType,
    };

    //   Just a command to upload the file using the PutObjectCommand method
    const command = new PutObjectCommand(params);

    // Sending the request to the s3 bucket to upload the image with correct info
    await s3.send(command);
    resume.imageName = randomImageName() + ".png";
    await resume.save();
    res.status(201).json({ message: "Saved the photo" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res
      .status(500)
      .json({ message: "Failed to save photo", error: error.message });
  }
};

module.exports = SaveResumePhoto;
