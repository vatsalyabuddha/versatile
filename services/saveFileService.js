
const fs = require("fs");
const moment = require("moment-timezone");
const path = require("path");

const saveFile = async (fileDetails, folderToSave, timeNow) => {
    try {
        checkPathExistElseCreate(folderToSave)
        const displayTime = moment(timeNow).format("YYYY-MM-DD HH:mm:ss").toString().replace(/ /g, "");
        const fileName = `${path.parse(fileDetails.name).name}_${displayTime}${path.extname(fileDetails.name)}`;
        const filePath = path.join(folderToSave, fileName);
        await writeFile(filePath, fileDetails);
        return filePath;
    } catch (exception) {
        throw "Error in saving File Path";
    }
}

const writeFile = async (filePath, fileDetails) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileDetails.data, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

const checkPathExistElseCreate = (pathToBeCreated) =>  {
    try {
        if (pathToBeCreated === '' || pathToBeCreated === undefined) {
            throw "Wrong path provided in config";
        }
        const directories = pathToBeCreated.split("/");
        let currentPath = "";
        directories.forEach((directory) => {
            if (fs.existsSync(currentPath) === undefined || fs.existsSync(currentPath) === '') {
                fs.mkdirSync(currentPath);
            }
        });
        return currentPath;
    } catch (exception) {
        throw "Wrong path provided in config11111";
    }
}

module.exports = {saveFile}