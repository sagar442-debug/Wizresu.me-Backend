const sharp = require("sharp");

const ImageCompressor = async (bufferFile) => {
  try {
    const compressedImage = await sharp(bufferFile)
      .png({
        quality: 90,
        compressionLevel: 4,
      })
      .toBuffer();
    return compressedImage;
  } catch (error) {
    console.error("Error compressing the image:", error);
    throw error;
  }
};

module.exports = ImageCompressor;
