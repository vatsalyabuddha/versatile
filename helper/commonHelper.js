const https = require('https')
var request = require('request');
var qs = require('qs');

const sendPostRequest = function (query, options) {
    return new Promise(async function (resolve, reject) {
        var queryStr;
        var data = {};
        var protocol = https;
        var protocolStr = 'https';
        options.method = 'POST';

        //console.log("Query:",query);
        if (options.headers) {
            if (options.headers['Content-Type'] && options.headers['Content-Type'] == 'application/json') {
                queryStr = JSON.stringify(query);
            } else {
                queryStr = qs.stringify(query);
            }
        } else {
            options.headers = {};
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            queryStr = qs.stringify(query);
        }

        if (options.protocol && options.protocol == 'http') {
            protocol = https;
            protocolStr = 'https';
            delete options.protocol;
        }

        if (typeof (options.protocol) !== 'undefined' && options.protocol !== null && options.protocol !== '') {
            delete options.protocol;
        }

        var url = protocolStr + '://' + options.host + options.path;
        data.url = url;
        data.method = options.method;
        data.request = query;
        data.response = {};
        //console.log("Options:",data);
        var request = protocol.request(options, function (response) {
            response.setEncoding('utf8');
            var responseData = '';
            response.on('data', function (data) {
                responseData += data;
                console.log(responseData,"responseData")
            });
            response.on('end', function () {
                try {
                    data.response = JSON.parse(responseData);
                    let responseType = '';
                    if (data.response && ((data.response.hasOwnProperty('status') && data.response.status) || data.response.hasOwnProperty('data'))) {
                        responseType = 'response';
                    } else {
                        responseType = 'error';
                    }
                    
                    resolve(data.response);
                } catch (err) {
                    reject(ERROR.DEFAULT_ERROR);
                }
            });
        });
        
        request.on('error', function (e) {
            reject(ERROR.DEFAULT_ERROR);
        });
        request.write(queryStr);
        request.end();
    });
}
module.exports = sendPostRequest;