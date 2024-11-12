const { s3, PutObjectCommand, bucketName } = require("../config/s3Config");

const SaveResumePhoto = async (req, res) => {
  // Creating params for the bucket inorder to upload the file with correct info and properties
  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimeType,
  };

  const picture = req.file.buffer;

  //   Just a command to upload the file using the PutObjectCommand method
  const command = new PutObjectCommand(params);

  // Sending the request to the s3 bucket to upload the image with correct info
  await s3.send(command);
  const fileUrl = `https://${bucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${req.file.originalname}`;

  res.status(201).json({ message: "Saved the photo", fileUrl });
};

module.exports = SaveResumePhoto;
