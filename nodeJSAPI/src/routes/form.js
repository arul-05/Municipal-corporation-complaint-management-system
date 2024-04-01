const express = require('express');
const formModel = require('../models/form');

const router = express.Router()

//Post Method
router.post('/addForm', async (req, res) => {
    try {
        const requestData = req.body;
        console.log("requestData", requestData)
        if (Object.keys(requestData).length < 1) {
            throw new Error("Please add value");
        }

        const data = new formModel({
            typeofproblem: requestData.typeofproblem,
            describe: requestData.describe,
            address: requestData.address,
            district: requestData.district,
            state: requestData.state,
            pincode: requestData.pincode,

        })

        const formData = await data.save();
        res.status(200).json({ "status": 200, "data": formData, "message": "Your complaint was registered successfully.", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

//Get all Method
router.get('/getForm', async (req, res) => {
    try {
        const data = await formModel.find();
        res.status(200).json({ "status": 200, "data": data, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = router;