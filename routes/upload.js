const Router = require("express");
const router = Router();
const imageUploadController = require("../controllers/imageUploadController");

router.post("/image", (req, res) =>
  imageUploadController.imageUploadController(req, res)
);

module.exports = router;
