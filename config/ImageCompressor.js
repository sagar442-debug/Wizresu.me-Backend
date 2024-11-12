const sharp = require("sharp");

const ImageCompressor = async (bufferFile) => {
  try {
    const compressedImage = await sharp(bufferFile)
      .png({
        quality: 70,
        compressionLevel: 9,
      })
      .toBuffer();
    return compressedImage;
  } catch (error) {
    console.error("Error compressing the image:", error);
    throw error;
  }
};

module.exports = ImageCompressor;
