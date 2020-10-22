const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true ,unique: true, lowercase: true },
    number: { type: String, required: true , unique: true}
    //id_user: { type: number, }
});

module.exports = mongoose.model('Contact',ContactSchema);