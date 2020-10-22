const { Router, text } = require('express');
const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.post('/', async(req, res) =>{
    const { email,password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err){
            res.status(500).send('Error login');
        }else if(!user){
            res.status(500).send('User no found');
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.status(500).send('Error autentication');   
                }else if(result){
                    res.status(200).send('User autentication success');
                }else{
                    res.status(500).send('Email or Password is incorrect!');
                }   
            });
        }
    });
});

module.exports = router;