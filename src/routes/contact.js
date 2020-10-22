const { Router, text } = require('express');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const Contact = require('../models/contact');

router.get('/', async(req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

router.post('/', async(req, res) =>{
    const { fname,lname,email,number } = req.body;
    const contact = new Contact({ fname,lname,email,number });
    const email_contact = contact.email;

    var smtpConfig = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, 
        auth: {
            user: 'duane.keeling80@ethereal.email',
            pass: 'rsmPpYzQ2WJd3SC2RN',
        },
    });

    var mailOtions = {
        from: "Alonso TBL-TECHNERDS",
        to: email_contact,
        subject: "Congratulations!",
        text: "We added you in our contact list. Thank you."
    }

    smtpConfig.sendMail(mailOtions, (err, info) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
    await contact.save();
    res.json({status: 'Contact Save'}); 
});

//UPDATE
router.put('/:id', async(req, res) => {
    const { fname,lname,email,number } = req.body;
    const newContact = {fname,lname,email,number};
    await Contact.findByIdAndUpdate(req.params.id, newContact);
    res.json({status: 'Contact updated'});
});

router.delete('/:id', async(req, res) => {
    await Contact.findByIdAndRemove(req.params.id);
    res.json({status: 'Contact Deleted'});
});

router.get('/:id', async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
});

module.exports = router;