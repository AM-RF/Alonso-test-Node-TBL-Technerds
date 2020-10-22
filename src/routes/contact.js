const { Router } = require('express');
const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

router.get('/', async(req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

router.post('/', async(req, res) =>{
    const { name,lname,email,number } = req.body;
    const contact = new Contact({ name,lname,email,number });
    await contact.save();
    res.json({status: 'Contact Save'});
});

//UPDATE
router.put('/:id', async(req, res) => {
    const { name,lname,email,number } = req.body;
    const newContact = {name,lname,email,number};
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