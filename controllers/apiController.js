const config = require('../config/config');
const vahanController = require('./vahanController');
const motorModel = require('../models/motorDetails');
const communicationController = require('./communicationController');
const communicationModel = require('../models/communicationModel');
const helper = require('./../helpers/helper')
const moment = require('moment');
const vahanImageDataFetchController = require('./vahanImageDataFetchController');

async function processVahanDataFetch(params){
    try{
        console.log("--- Params : \n",params);
        if(!params){
            return { status : false, message : "Please send required fields" };
        }

        let regNumber,response = {};
        if(params && params.regNumber){
            regNumber = params.regNumber;
        }else{
            console.log("Track1");
            try {
                regNumber = await vahanImageDataFetchController.vahanImageDataFetchController(params);  
                console.log('regNumber===== ' + regNumber + " ((())) " + typeof(regNumber));              
            } catch (exception) {
                throw "Could not process image this time, please try after some time.";
            }
        }

        // registration number vallidations
        if(!regNumber || (typeof regNumber) !== "string"){
            return { status : false, message : "Error detecting registration number." };
        }
        console.log(regNumber);

        //check if the regNumber is already checked recently
        let existedData = await motorModel.fetchByRegNumber(regNumber);
        //console.log("Existed Data :",existedData);
        if(existedData && existedData.length > 0){
            //check if need to send communication again
            let differenceInDays = helper.countDaysDifference(new Date(),existedData['created_date'] ? existedData['created_date'] : new Date());
            
            if(differenceInDays > config.communication_limit_days){
                //insert into communication table
                let communicationRes = await handleCommunication(existedData);
                response = { ...response, ...communicationRes};
            }else{
                response = {
                    owner_name : existedData['owner_name'],
                    registration_number : existedData['registration_number'],
                    registration_date : existedData['registration_date'],
                    insurance_upto : existedData['insurance_upto'],
                    message : "This registration number was already checked within the communication limit.",
                    is_inssured : existedData['insurance_status']
                };
            }
        }else{
            //fetch vehicle details from vahan
            console.log('RegNumber====' + regNumber);
            let data = await vahanController.fetchRegistrationDetails(regNumber);

            // handling Uninsured vehicle
            let current_date = new Date(), insurance_upto_date = new Date(data['insurance_upto']);
            let insurance_status = -1, is_communication_required = true;
            if(insurance_upto_date < current_date){
                insurance_status = config.status.insuranceExpired;
                is_communication_required = true;
            }else{
                insurance_status = config.status.insuranceValid; 
                is_communication_required = false;
            } 

            // process motor details
            let insertData = {
                registration_number : data['registration_number'],
                maker_model : data['maker_model'],
                owner_name : data['owner_name'],
                rto_code : data['rto_code'],
                rto_name : data['rto_name'],
                rto_city_id : data['rto_city_id'],
                rto_city_name : data['rto_city_name'],
                rto_state_id : data['rto_state_id'],
                rto_state_name : data['rto_state_name'],
                registration_date : data['registration_date'],
                insurance_upto : data['insurance_upto'],
                fitness_upto : data['fitness_upto'],
                make_name : data['make_name'],
                model_name : data['model_name'],
                fuel_type : data['fuel_type'],
                is_communication_required : is_communication_required ? 1 : 0,
                insurance_status : insurance_status
            }
            await motorModel.insertIntoMotorDetails(insertData);
            response = {
                owner_name : data['owner_name'],
                registration_number : data['registration_number'],
                registration_date : data['registration_date'],
                insurance_upto : data['insurance_upto']
            };

            //send communication if required
            if(insurance_status === config.status.insuranceExpired){
                let communicationRes =  await handleCommunication(data);
                response = { ...response, ...communicationRes};
            }else{
                response.message = "Registration Number is already insured.";
                response.is_inssured =1;
            }
        }
        console.log("############### Final Response:\n",response)
        return response;
    }catch(err){
        throw err;
    }
    
}

async function handleCommunication(data){
    try{
        let response = {};

        let communicationRes = await communicationController.sendSmsController();
        communicationRes = JSON.parse(communicationRes)

        let communicationRes2 = await communicationController.sendEmailController();
        communicationRes2 = JSON.parse(communicationRes2)

        // store communication in db
        let insertCommuData = {
            communication_type : "SMS",
            reg_number : data['registration_number'],
            communication_date : moment().local().format("YYYY-MM-DD HH:MM:SS")
        }
        
        if(communicationRes[0].status == 1){
            console.log("Registration Number is uninsured. Communication sent.");
            insertCommuData['status_id'] = 1;
            response.message ="Registration Number is uninsured. Communication sent.";
            response.is_inssured = -1;

        }else{
            insertCommuData['status_id'] =  -1;
            response.message = "Registration Number is uninsured. Communication failed.";
            response.is_inssured = -1;
        }

        // store communication in db
        let insertCommuData2 = {
            communication_type : "EMAIL",
            reg_number : data['registration_number'],
            communication_date : moment().local().format("YYYY-MM-DD HH:MM:SS")
        }
        
        if(communicationRes[0].status == 1){
            console.log("Registration Number is uninsured. Communication sent.");
            insertCommuData2['status_id'] = 1;

        }else{
            insertCommuData2['status_id'] =  -1;
            response.message = "Registration Number is uninsured. Communication failed.";
        }
        //console.log("----- Communication Data ------\n",insertCommuData);
        //console.log("----- Communication Data ------\n",insertCommuData2);
        await communicationModel.insertCommunicationDetails(insertCommuData);
        await communicationModel.insertCommunicationDetails(insertCommuData2);
        return response;
    }catch(error){
        console.log("Error : \n",error);
        throw error;
    }
}

async function fetchAllMotorData(params){
    try{
        let data = await motorModel.fetchAllMotorData(params.filters ? params.filters : {});
        return data;
    }catch(err){
        throw err;
    }
    
}
module.exports = {processVahanDataFetch, fetchAllMotorData}