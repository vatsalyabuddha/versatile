const tesseract = require("node-tesseract-ocr");

const imageUploadController = async (params) => {
  try {
    let result = "";
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    };
    
    console.log("FileData:",params.number_plate_image.data);
    const text = await tesseract.recognize(
      params.number_plate_image.data,
      config
    );
    result = text.replace(/[^a-z0-9]/gi, "");
    
    return result;
  } catch (e) {
    throw e;
  }
};
module.exports = { imageUploadController };
