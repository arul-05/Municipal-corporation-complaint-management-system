const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Post Method
router.post('/register', async (req, res) => {
    try {
        const requestData = req.body;
        console.log("requestData", requestData)
        if (Object.keys(requestData).length < 1) {
            throw new Error("Value ilama register panna mudiyathu da.");
        }

        var checkUser = userModel.find({email:requestData.email}).countDocuments();
        if(checkUser && checkUser.length>0){
            throw new Error("vera email id use pannu thambi")
        }

        // bcrypt.hash(requestData.password, saltRounds, function(err, hash) {
        //     requestData.password = hash
        // });

        const data = new userModel({
            name: requestData.name,
            password: requestData.password,
            email: requestData.email,
            created_timestamp: new Date().getTime()

        })
        const formData = await data.save();
        res.status(200).json({ "status": 200, "data": formData, "message": "Registered successfully.", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.post('/login', async (req, res) => {
    try {
        const requestData = req.body;
        console.log("requestData", requestData)
        if (Object.keys(requestData).length < 1) {
            throw new Error("Need a value");
        }

        var checkUser = await userModel.findOne({
            $and: [
                {email: requestData.email},
                {password: requestData.password}
            ]
        })
        // var token = await jwt.sign({checkUser},'bhijkasvfdbjhkasfgvlkhjfsgvl');
        // console.log(token)
        // await userModel.findOneAndUpdate({email:requestData.email},{token:token});
        // checkUser.token = token;
        if(!checkUser){
            throw new Error("password incorrect")
        }else{
            res.status(200).json({ "status": 200, "data": checkUser, "message": "Login successfully.", "error": false })

        }
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

//Get all Method
router.get('/getUserList', async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).json({ "status": 200, "data": data, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = router;