const express = require("express");
const router = express.Router();
const apiController = require('../controllers/apiController');
// const statusM = require('../models/statusModel');


router.get('/',(req,res) => {
    res.send('API!!');
})

router.post('/init-process',async (req,res) => {
    let params = req.files ? req.files : req.body ? req.body  : {};
    try{
        const result = await apiController.processVahanDataFetch(params);
        res.send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/process-reg',async (req,res) => {
    let params = req.files ? req.files : req.body ? req.body  : {};
    try{
        const result = await apiController.processVahanDataFetch(params);
        res.send(result)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/total-reg-checked', async (req,res) => {
    let params = req.body;
    try{
        const result = await apiController.fetchAllMotorData(params);
        res.send(result);
    }catch(error){
        res.sendStatus(400).send(error)
    }
})

router.post('/vehicle-list', async (req,res) => {
    let params = req.body;
    try{
        const result = await apiController.fetchAllMotorData(params);
        res.send(result);
    }catch(error){
        res.sendStatus(400).send(error)
    }
})

module.exports = router 