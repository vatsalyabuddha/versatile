const express = require("express");
const router = express.Router();
const apiController = require('../controllers/apiController');
// const statusM = require('../models/statusModel');


router.get('/',(req,res) => {
    res.send('API!!');
})

router.post('/init-process',(req,res) => {
    // const regNumber = req.body.regNumber;
    // const response = apiController.processVahanDataFetch(req,res);
    // res.status(200).send(response.message);
    apiController.processVahanDataFetch(req,res);
})

router.post('/process-reg',(req,res) => {


})

router.get('/total-reg-checked', async (req,res) => {
    // const response = await apiController.fetchAllMotorData();
    // console.log("API:Route:",response);
    // res.status(200).send(response);
    apiController.fetchAllMotorData(req,res);
})

router.get('/total-uninsured-reg',(req,res) => {

})

router.get('/total-insured-reg',(req,res) => {

})

router.get('/total-sms-triggered',(req,res) => {

})

module.exports = router 