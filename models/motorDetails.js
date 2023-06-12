const db = dbConnection;
const dbHelper = require("./../helpers/dbHelper");

async function fetchAllMotorData(){
    try{
        let data = await db.promise().query("SELECT * FROM motor_details");
        return data[0];
    }catch(err){
        console.log("############Error",err);
        throw err;
    }
}

async function insertIntoMotorDetails(params){
    return new Promise((resolve,reject) => {
        try{
            let sql =  "INSERT INTO `versatile`.`motor_details`" + dbHelper.values(params);
            db.query(sql, function (error, result, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        }catch(error){
            console.log("############ Error",error);
            reject(error);
        }
    });
}

async function fetchByRegNumber(regNumber){
    return new Promise((resolve,reject) => {
        try{
            let sql = "select * from `versatile`.`motor_details` where registration_number = " + "'"+regNumber+"'" + "ORDER BY id DESC LIMIT 1";
            db.query(sql, function (error, result, fields) {
                if (error) {
                    reject(error);
                } else {
                    //console.log("Result :",result);
                    resolve(result && result[0] ? result[0] : []);
                }
            });
        }catch(error){
            console.log("############Error",error);
            reject(error);
        }
    });
}



module.exports = {fetchAllMotorData, insertIntoMotorDetails, fetchByRegNumber};
