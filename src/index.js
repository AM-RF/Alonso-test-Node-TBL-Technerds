const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Router
app.use('/api/register',require('./routes/userRegister'));
app.use('/api/authenticate',require('./routes/userAuthentication'));
app.use('/api/contacts',require('./routes/contact'));

// Static files
app.use(express.static(path.join(__dirname, 'public'))) 

// Starr server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});