const db = dbConnection;
const dbHelper = require("./../helpers/dbHelper");

async function insertCommunicationDetails(params){
    return new Promise((resolve,reject) => {
        try{
            let sql =  "INSERT INTO `versatile`.`communication_details`" + dbHelper.values(params);
            db.query(sql, function (error, result) {
                if (error) {
                    console.log("############ Error",error);
                    reject(error);
                } else {
                    resolve(result && result[0] ? result[0] : []);
                }
            });
        }catch(error){
            console.log("############ Error",error);
            reject(error);
        }
    });
}

async function updateCommunicationDetails(updateObj, findObj){
    return new Promise((resolve,reject) => {
        try{
            let sql = "UPDATE `versatile`.`communication_details` SET ? WHERE ?";
            db.query(sql, [updateObj, findObj], function (error, result) {
                if (error) {
                    console.log("############ Error",error);
                    reject(error);
                } else {
                    resolve(result && result[0] ? result[0] : []);
                }
            });
        }catch(error){
            console.log("############ Error",error);
            reject(error);
        }
    });
}



module.exports = { insertCommunicationDetails, updateCommunicationDetails};
