const db = dbConnection;
const dbHelper = require("./../helpers/dbHelper");
const moment = require('moment');

async function fetchAllMotorData(params){
    return new Promise((resolve,reject) => {
        try{
            let sql =  "SELECT * FROM motor_details WHERE 1 ";
            if(params.state){
                sql += dbHelper.andWhere("rto_code",params.state,"like");
            }
            if(params.make_name){
                sql += dbHelper.andWhere("make_name",params.make_name,"=");
            }
            if(params.fuel_type){
                sql += dbHelper.andWhere("fuel_type",params.fuel_type,"like");
            }
            if(params.is_insured){
                sql += dbHelper.andWhere("insurance_status",params.is_insured,"=",true);
            }

            if(params.date_to){
                sql += dbHelper.andWhere("created_date",moment(params.date_to).format("YYYY-MM-DD 23:59:59"),"<=");
            }else {
                sql += dbHelper.andWhere("created_date",moment().local().format("YYYY-MM-DD 23:59:59"),"<=");
            }

            if(params.date_from){
                sql += dbHelper.andWhere("created_date",moment(params.date_from).format("YYYY-MM-DD 00:00:00"),">=");
            }else {
                sql += dbHelper.andWhere("created_date",moment().local().subtract(1, 'months').format("YYYY-MM-DD 00:00:00"),">=");
            }
            console.log("------ final sql --------\n",sql);
            
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
