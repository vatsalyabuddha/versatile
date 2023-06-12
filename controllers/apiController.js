const config = require('../config/config');
const vahanController = require('./vahanController');
const motorModel = require('../models/motorDetails');
const communicationController = require('./communicationController');
const communicationModel = require('../models/communicationModel');
const imageUploadController = require('./imageUploadController');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './visiontest-373706-2154cd2c06b9.json'
});
const saveFileService = require('../services/saveFileService');

async function processVahanDataFetch(req,res){
    try{
        let regNumber;
        if(req.body && req.body.regNumber){
            regNumber = req.body.regNumber;
        }else{
            console.log("Track1");
            try {
                await processVahanImageDataFetch(req, res);
                regNumber = req.regNumber;
                console.log(regNumber);
            } catch (exception) {
                return res.status(200).send("Could not process image this time, please try after some time.");
            }
        }
        console.log("RegNUmber:",regNumber)
        //regNumber = "HR12AA4196";
        
        let response;
        //check if the regNumber is already checked
        let ifExists = await motorModel.fetchByRegNumber(regNumber);

        //console.log("IF EXISTS:",ifExists[0][0].id);
        if(ifExists && ifExists[0] && ifExists[0][0] && ifExists[0][0].id){
            //check if need to send communication again
            let existedData = ifExists[0][0];
            let current_date = new Date();
            let created_date = new Date(existedData['created_date']);
            
            // To calculate the time difference of two dates
            var Difference_In_Time = current_date.getTime() - created_date.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            if(Difference_In_Days > 15){
                //insert into communication table
                let insertCommuData = "("+
                            "'SMS'"+","+
                            "'"+ existedData['registration_number']+"')";
                let insertCommunication = await communicationModel.insertCommunicationDetails(insertCommuData);
                let communicationRes = await communicationController.sendSmsController(req,res);
                communicationRes = JSON.parse(communicationRes)
                console.log("Commnuication Response:",communicationRes[0].status);

                // store communication in db
                if(communicationRes[0].status == 1){
                    console.log("Registration Number is uninsured. Communication sent.");
                    let updateData = {
                        status_id : 1,
                        reg_number : existedData['registration_number']
                    };
                    let updateCommuData = await communicationModel.updateCommunicationDetails(updateData);
                    response.message ="Registration Number is uninsured. Communication sent.";
                    response.is_inssured =-1;

                }else{
                    let updateData = {
                        status_id : -1,
                        reg_number : existedData['registration_number']
                    };
                    let updateCommuData = await communicationModel.updateCommunicationDetails(updateData);
                    response.message = "Registration Number is uninsured. Communication failed.";
                    response.is_inssured =-1;
                }
            }else{
                response = {
                    owner_name : ifExists[0][0]['owner_name'],
                    registration_number : ifExists[0][0]['registration_number'],
                    registration_date : ifExists[0][0]['registration_date'],
                    insurance_upto : ifExists[0][0]['insurance_upto'],
                    message : "This registration number was already checked within the communication limit.",
                    is_inssured : ifExists[0][0]['insurance_status']
                };
            }
        }else{
            console.log("Not Exists:");
            //fetch vehicle details from vahan
            console.log('RegNumber====' + regNumber);
            let data = await vahanController.fetchRegistrationDetails(regNumber);
            data = data['data'];
            console.log("Res Data:",data);
            // handling Uninsured vehicle
            let current_date = new Date();
            let insurance_upto_date = new Date(data['insurance_upto']);

            let insurance_status,is_communication_required;
            if(insurance_upto_date <  current_date){
                insurance_status = config.status.insuranceExpired;
                is_communication_required = true;
            }else{
                insurance_status = config.status.insuranceValid; 
                is_communication_required = false;
            } 

            //console.log("insurance_status:",insurance_status);
            //console.log("is_communication_required:",is_communication_required);
            // process motor details
            let insertData = "("+
                            "'"+ data['registration_number']+"'"+","+
                            "'"+  data['maker_model']+"'"+","+
                            insurance_status+","+
                            "'"+  data['owner_name']+"'"+","+
                            "'"+  data['rto_code']+"'"+","+
                            "'"+  data['rto_name']+"'"+","+
                            "'"+  data['rto_city_id']+"'"+","+
                            "'"+  data['rto_city_name']+"'"+","+
                            "'"+  data['rto_state_id']+"'"+","+
                            "'"+  data['rto_state_name']+"'"+","+
                            "'"+  data['registration_date']+"'"+","+
                            "'"+  data['insurance_upto']+"'"+","+
                            "'"+ data['fitness_upto']+"'"+","+
                            is_communication_required+")";
            //console.log("insertData:",insertData);
            // store in Db
            let res = await motorModel.insertIntoMotorDetails(insertData);
            //console.log("insert response:",res);
            response = {
                owner_name : data['owner_name'],
                registration_number : data['registration_number'],
                registration_date : data['registration_date'],
                insurance_upto : data['insurance_upto']
            };

            //console.log("Track1");
            //sent communication if required
            if(is_communication_required){
                //console.log("Track2");
                //insert into communication table
                let insertCommuData = "("+
                            "'SMS'"+","+
                            "'"+ data['registration_number']+"')";
                let insertCommunication = await communicationModel.insertCommunicationDetails(insertCommuData);
                let communicationRes = await communicationController.sendSmsController(req,res);
                communicationRes = JSON.parse(communicationRes)
                console.log("Commnuication Response:",communicationRes[0].status);

                // store communication in db
                if(communicationRes[0].status == 1){
                    console.log("Registration Number is uninsured. Communication sent.");
                    let updateData = {
                        status_id : 1,
                        reg_number : data['registration_number']
                    };
                    let updateCommuData = await communicationModel.updateCommunicationDetails(updateData);
                    response.message ="Registration Number is uninsured. Communication sent.";
                    response.is_inssured =-1;
                }else{
                    let updateData = {
                        status_id : -1,
                        reg_number : data['registration_number']
                    };
                    let updateCommuData = await communicationModel.updateCommunicationDetails(updateData);
                    response.message = "Registration Number is uninsured. Communication failed.";
                    response.is_inssured =-1;
                }
            }else{
                response.message = "Registration Number is already insured.";
                response.is_inssured =1;
            }
        }

        console.log("Final Response:",response)
        res.status(200).send(response);
    }catch(err){
        res.status(400).send(err);
    }
    
}

async function processVahanImageDataFetch(req,res){
    try {
        // Vision API Call
        const currentFolderPath = await saveFileService.saveFile(req.files.number_plate_image, "documents/current", new Date());
        await client.textDetection(currentFolderPath)
        .then((result) => {
            const numberPlateText = result[0].fullTextAnnotation.text.split("\n");
            result.forEach((textAnnotationsData) => {
                textAnnotationsData.textAnnotations.forEach((data) => {
                    let finalTransformedData = data.description;
                    finalTransformedData = finalTransformedData.replace(/ /g, "");
                    finalTransformedData = finalTransformedData.replace(/\n/g, "");
                    if (finalTransformedData.length === 10) {
                        req.regNumber = finalTransformedData;
                    }
                })
            });
        })
    } catch (err) {
        throw "Could Not Process Image this time. Please try again later";
    }
        
    
}

async function fetchAllMotorData(req,res){
    try{
        let data = await motorModel.fetchAllMotorData();
        console.log("Data:APIController:",data);
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
    
}
module.exports = {processVahanDataFetch, processVahanImageDataFetch, fetchAllMotorData}