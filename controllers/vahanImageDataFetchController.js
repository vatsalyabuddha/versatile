const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './visiontest-373706-2154cd2c06b9.json'
});
const saveFileService = require('../services/saveFileService');

async function vahanImageDataFetchController(req){
    try {
        // Vision API Call
        const currentFolderPath = await saveFileService.saveFile(req.number_plate_image, "documents/current", new Date());
        return await client.textDetection(currentFolderPath)
        .then((result) => {
            let regExp = /[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}/i;
            result.forEach((textAnnotationsData) => {
                textAnnotationsData.textAnnotations.forEach((data) => {
                    let finalTransformedData = data.description;
                    finalTransformedData = finalTransformedData.replace(/ /g, "");
                    finalTransformedData = finalTransformedData.replace(/\n/g, "");
                    if (finalTransformedData.length === 10) {
                        if (finalTransformedData.match(regExp) !== null && finalTransformedData.match(regExp) !== undefined) {
                            req.regNumber = finalTransformedData.match(regExp);
                        }
                    } else if (finalTransformedData.length > 10) {
                        if (finalTransformedData.match(regExp) !== null && finalTransformedData.match(regExp) !== undefined) {
                            req.regNumber = finalTransformedData.match(regExp);
                        }
                    }
                })
            });
            if (req.regNumber === null || req.regNumber === undefined) {
                throw "Could Not Process Image this time. Please try again later";
            }
            return req.regNumber.toString();
        });
    } catch (err) {
        throw "Could Not Process Image this time. Please try again later";
    }
}
module.exports = { vahanImageDataFetchController };