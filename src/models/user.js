const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema} = mongoose;

const saltRounds = 10;

const UserSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase:true },
    password: { type: String, required: true, select: false }
});

UserSchema.pre('save', function(next){
    if(this.isNew ||  this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
}); 

UserSchema.methods.isCorrectPassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);