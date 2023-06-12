let config = {};
config.insCommunication = {};
config.insCommunication.protocol = 'https';
config.insCommunication.host = 'communicationstaging.insurancedekho.com';
config.insCommunication.xAuthToken = '6c4d3a63f29fde962259aae66830e8ec';
config.insCommunication.xAuthId = '794';

config.sms = {};
config.sms.host = 'www.gaadi.com';
config.sms.path = '/api_send_sms.php';
config.sms.NDNC = 1;
config.sms.priority = 5;
config.sms.send_response = 'Y';


module.exports = config 
