const Router = require("express");
const router = Router();
const communicationController = require("../controllers/communicationController.js");

router.post("/send-email", (req, res) =>
  communicationController.sendEmailController(req, res)
);
router.post("/send-sms", (req, res) =>
  communicationController.sendSmsController(req, res)
);

module.exports = router;
