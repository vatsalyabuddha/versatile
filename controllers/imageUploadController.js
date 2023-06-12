const tesseract = require("node-tesseract-ocr");

const imageUploadController = async (req, res) => {
  try {
    console.log("Track2");
    let result = "";
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    };
    console.log("Track3");
    console.log("FileData:",req.files.number_plate_image.data);
    const text = await tesseract.recognize(
      req.files.number_plate_image.data,
      config
    );
    console.log("text:",text);
    console.log("Track4");
    result = text.replace(/[^a-z0-9]/gi, "");
    console.log("Track5");
    console.log("Result:",result);
    return result;
  } catch (e) {
    console.log("Track6");
    throw e;
  }
};
module.exports = { imageUploadController };
