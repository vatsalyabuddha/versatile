const communicationService = require("../services/communicationService.js");

const sendEmailController = async (req, res) => {
  try {
    const emailList = [
      "vatsalya.buddha@insurancedekho.com"
    ];
    const response = await communicationService.sendEmail(emailList);
    return res.status(200).send(response);
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
