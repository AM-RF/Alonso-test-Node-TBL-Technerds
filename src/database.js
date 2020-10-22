const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/contact';

mongoose.connect(URI)
    .then(db => console.log('BD is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;