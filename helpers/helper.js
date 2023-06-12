const request = require('request');

async function httpGet (req){
    return new Promise(function(resolve, reject){
        req.method = 'GET';
        req.headers = {'Content-Type': 'application/json'};
        req.json =  true;
        req.timeout = 5000;
        request(req, function(error, response){
            if(error){
                console.log("#######################Error:",error);
                return reject(error);
            }
            return (response.body) ? resolve(response.body) : resolve({});
        })
    })
}

async function httpPost (req){
    return new Promise(function(resolve, reject){
        req.method = 'POST';
        req.headers = {'Content-Type': 'application/json'};
        req.json =  true;
        req.timeout = 5000;
        request(req, function(error, response){
            if(error){
                console.log("#######################Error:",error);
                return reject(error);
            }
            return (response.body) ? resolve(response.body) : resolve({});
        })
    })
}

module.exports = {httpGet, httpPost};