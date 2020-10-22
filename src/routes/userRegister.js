const { Router, text } = require('express');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', async(req, res) =>{
    const { fname,lname,email,password } = req.body;
    const register = new User({ fname,lname,email,password });
    console.log(register);
    await register.save(err =>{
        if(err){
            res.status(500).send('Register failed');
        }else{
            res.status(200).send('Register success');
        }
    });
});


module.exports = router;