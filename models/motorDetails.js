const db = dbConnection;

async function fetchAllMotorData(){
    try{
        let data = await db.promise().query("SELECT * FROM motor_details");
        //console.log("############Res",data[0]);
        return data[0];
    }catch(err){
        console.log("############Error",err);
        throw err;
    }
}

async function insertIntoMotorDetails(params){
    try{
        let sql = "INSERT INTO `versatile`.`motor_details`(`registration_number`,`maker_model`,`insurance_status`,`owner_name`,`rto_code`,`rto_name`,`rto_city_id`,`rto_city_name`,`rto_state_id`,`rto_state_name`,`registration_date`,`insurance_upto`,`fitness_upto`,`is_communication_required`) VALUES";
        let insertSQL = sql + params;
        let data = await db.promise().query(insertSQL);
        //console.log("############Res",data);
        return data;
    }catch(err){
        console.log("############Error",err);
        throw err;
    }
}

async function fetchByRegNumber(regNumber){
    try{
        let sql = "select * from `versatile`.`motor_details` where registration_number = " + "'"+regNumber+"'" + "ORDER BY id DESC LIMIT 1";
        console.log("SQL:",sql);
        let data = await db.promise().query(sql);
        //console.log("##############Data:",data);
        return data;
    }catch(err){
        console.log("############Error",err);
        throw err;
    }
}



module.exports = {fetchAllMotorData, insertIntoMotorDetails, fetchByRegNumber};
