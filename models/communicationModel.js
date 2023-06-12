const db = dbConnection;

async function insertCommunicationDetails(params){
    try{
        let sql = "INSERT INTO `versatile`.`communication_details` (`communication_type`,`reg_number`) VALUES";
        let insertSQL = sql + params;
        let data = await db.promise().query(insertSQL);
        //console.log("############Res",data);
        return data;
    }catch(err){
        console.log("############Error",err);
        throw err;
    }
}

async function updateCommunicationDetails(params){
    try{
        let sql = "UPDATE `versatile`.`communication_details` SET `status_id` = ";
        let finalSQL = sql + "'"+ params.status_id + "'," + "communication_date = '" + new Date()
                        + "'" + "WHERE reg_number = '" + params.reg_number +"'";
        console.log("updateQuery:",finalSQL);
        let data = await db.promise().query(finalSQL);
        //console.log("############Res",data);
        return data;
    }catch(err){
        console.log("############Error",err);
        throw err;
    }
}

module.exports = { insertCommunicationDetails, updateCommunicationDetails};
