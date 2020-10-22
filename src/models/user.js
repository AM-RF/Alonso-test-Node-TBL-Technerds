const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema} = mongoose;

new UserSchema = new Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase:true },
    password: { type: String, required: true, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', (next) => {
    let user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) =>{
        if (err) return next()
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
});

module.exports = mongoose.model('User',UserSchema )