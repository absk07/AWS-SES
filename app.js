require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const ExpressError = require('./utils/ExpressError');

const MONGODB_HOST_NAME = process.env.MONGODB_HOST_NAME || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || '27017';
const MONGODB_NAME = process.env.MONGODB_NAME || 'infyulabs';

const MONGODB_URI = process.env.MONGODB_CLOUD_URI || `mongodb://${MONGODB_HOST_NAME}:${MONGODB_PORT}/${MONGODB_NAME}`;



const app = express();

const indexRoutes = require('./routes/index');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    parameterLimit: 500000,
    limit: '50mb',
    extended: true
}));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.json({
        success: true,
        message: 'Success!'
    });
});

app.use(indexRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).send(err);
});

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(result => {
    app.listen(PORT, () => {
        console.log('SERVER RUNNING ON PORT', PORT);
    });
}).catch(error => {
    console.log(error);
});