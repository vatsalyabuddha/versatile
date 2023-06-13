const communicationService = require("../services/communicationService.js");

const sendEmailController = async () => {
  try {
    const emailList = [
      "vatsalya.buddha@insurancedekho.com"
    ];
    const response = await communicationService.sendEmail(emailList);
    return response;
  } catch (e) {
    throw e;
  }
};
const sendSmsController = async () => {
  try {
    const mobileList = [9825527889];          
    const response = await communicationService.sendSms(mobileList);
    return response;
  } catch (e) {
    throw e;
  }
};

module.exports = { sendEmailController, sendSmsController };
