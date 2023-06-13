var config = {

    vahan : {
        baseuri : "https://autodb.insurancedekho.com/v1/registration-prime?registration_number=",
        otherParams : "&source=LMW&sub_source=POS&data_source=RtoApi"
    },
    status :{
        insuranceDefault : 0,
        insuranceValid : 1,
        insuranceExpired : -1
    },
    communication_limit_days : 15
}

module.exports = config;