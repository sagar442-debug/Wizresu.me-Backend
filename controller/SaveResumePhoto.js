const SaveResumePhoto = (req, res) => {
  const picture = req.file;
  console.log(picture);
  res.status(201).json({ message: "Saved The photo", picture });
};

module.exports = SaveResumePhoto;
