const tesseract = require("node-tesseract-ocr");
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './visiontest-373706-2154cd2c06b9.json'
});
const saveFileService = require('../services/saveFileService');

const tessaractFunction = async (params) => {
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

async function processVahanImageDataFetch(params){
  try {
      // Vision API Call
      const currentFolderPath = await saveFileService.saveFile(params.number_plate_image, "documents/current", new Date());
      await client.textDetection(currentFolderPath)
      .then((result) => {
          const numberPlateText = result[0].fullTextAnnotation.text.split("\n");
          result.forEach((textAnnotationsData) => {
              textAnnotationsData.textAnnotations.forEach((data) => {
                  let finalTransformedData = data.description;
                  finalTransformedData = finalTransformedData.replace(/ /g, "");
                  finalTransformedData = finalTransformedData.replace(/\n/g, "");
                  if (finalTransformedData.length === 10) {
                      return finalTransformedData;
                  }
              })
          });
      })
  } catch (err) {
      console.log("Error:",err);
      throw "Could Not Process Image this time. Please try again later";
  }
}
module.exports = { tessaractFunction, processVahanImageDataFetch };
