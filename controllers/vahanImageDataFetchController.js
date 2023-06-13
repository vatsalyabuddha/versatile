const fs = require("fs");
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
            console.log("--------- Text Detection Result -------\n",result);
            let regExp = /[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}/i;
            result.forEach((textAnnotationsData) => {
                textAnnotationsData.textAnnotations.forEach((data) => {
                    console.log("--------- Text Detection Result : data-------\n",data);
                    let finalTransformedData = data.description;
                    finalTransformedData = finalTransformedData.replace(/ /g, "");
                    finalTransformedData = finalTransformedData.replace(/\n/g, "");
                    console.log("--------- Text Detection Result : finalTransformedData-------\n",finalTransformedData);
                    if (finalTransformedData.length === 10 || finalTransformedData.length === 11 ) {
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
            console.log("------ req.RegNumber --------",req.regNumber);
            if (req.regNumber === null || req.regNumber === undefined) {
                throw "Could Not Process Image this time. Please try again later";
            }
            fs.unlinkSync(currentFolderPath);
            return req.regNumber.toString();
        });
    } catch (err) {
        throw "Could Not Process Image this time. Please try again later";
    }
}
module.exports = { vahanImageDataFetchController };