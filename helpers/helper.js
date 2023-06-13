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
                console.log("####################### Error:",error);
                return reject(error);
            }
            return (response.body) ? resolve(response.body) : resolve({});
        })
    })
}

function countDaysDifference(startDate, endDate){
    // To calculate the time difference of two dates
    let Difference_In_Time = startDate.getTime() - endDate.getTime();
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
}

module.exports = {httpGet, httpPost, countDaysDifference};