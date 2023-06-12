const config = require('../config/config');
const helper = require('../helpers/helper');
const request = require('request');
const res = require('express/lib/response');

async function fetchRegistrationDetails(regNumber){

    const uri = config.vahan.baseuri + regNumber + config.vahan.otherParams;
    let req = {
        uri : uri
    }

    let data;

    try{
        let data = await helper.httpGet(req);
        return data;
    }catch(err){
        throw err;
    }
}


module.exports = {fetchRegistrationDetails}