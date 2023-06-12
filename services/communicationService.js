const config = require('../config/setting.js')
const sendPostRequest = require('../helper/commonHelper.js')


const sendEmail = ( emailList ) => {
    return new Promise(async function (resolve, reject) {
        let data = {}, to = {};
        if (emailList) {
            for (let i = 0; i < emailList.length; i++) {
                to[emailList[i]] = '';
            }
            data.to = JSON.stringify(to);
        }
        data.template_name = 'EMAIL-TEMP_INS';
        var options = {
            protocol: config.insCommunication.protocol,
            host: config.insCommunication.host,
            path: '/send_mail',
            headers: {
                'x-auth-id': config.insCommunication.xAuthId,
                'x-auth-token': config.insCommunication.xAuthToken,
                'Content-Type': 'application/json'
            }
        };
        try {
            let result = await sendPostRequest(data, options);
            if (result.data) {
                resolve(result.data);
            } else if (result.error) {
                throw result.error;
            } else {
                throw ERROR.DEFAULT_ERROR;
            }
        } catch (e) {
            reject(e);
        }
    });
}

const sendSms = ( mobileList ) => {
    return new Promise(async (resolve, reject) => {
        let options = {
            protocol: config.insCommunication.protocol,
            host: config.insCommunication.host,
            path: '/send_sms',
            method: 'POST',
            headers: {
                'x-auth-key': config.insCommunication.xAuthId,
                'x-auth-token': config.insCommunication.xAuthToken,
                'Content-Type': 'application/json'
            }
        };
        let queryParams = {
            template_name: "MOTORSHAREQUOTE_UPDATE_INS",
            sent_to: JSON.stringify(mobileList),
            sms_template : JSON.stringify({
                URL : 'https://dev2.insurancedekho.com/'
            })
        };
        try {
            let result = await sendPostRequest(queryParams, options);
            if (result.data) {
                console.log(result.data)
                resolve(result.data);
            } else if (result.errors) {
                throw result.errors;
            } else {
                throw ERROR.DEFAULT_ERROR;
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {sendEmail, sendSms}
