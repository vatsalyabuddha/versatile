const communicationService = require("../services/communicationService.js");

const sendEmailController = async (req, res) => {
  try {
    const emailList = [
      "sakshamkashyap761@gmail.com",
      "vatsalya.buddha@insurancedekho.com",
      "princekashyap77@gmail.com",
      "sartaj.1@insurancedekho.com"
    ];
    const response = await communicationService.sendEmail(emailList);
    return res.status(200).send(response);
  } catch (e) {
    throw e;
  }
};
const sendSmsController = async (req, res) => {
  try {
    const mobileList = [8700744990, 7827555682];          
    const response = await communicationService.sendSms(mobileList);
    console.log(response,"contoller")
    return response;
  } catch (e) {
    throw e;
  }
};

module.exports = { sendEmailController, sendSmsController };
