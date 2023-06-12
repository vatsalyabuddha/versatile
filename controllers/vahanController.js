const config = require('../config/config');
const helper = require('../helpers/helper');

async function fetchRegistrationDetails(regNumber){
    try{
        let req = { uri : config.vahan.baseuri + regNumber + config.vahan.otherParams };
        let response = await helper.httpGet(req);
        if(response && response.data){
            return response.data;
        }
        return {};
    }catch(err){
        throw err;
    }
}

module.exports = {fetchRegistrationDetails}