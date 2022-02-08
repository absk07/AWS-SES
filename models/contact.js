const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    department: {
        type: String
    },
    message: {
        type: String
    },
});

module.exports = mongoose.model('Contact', contactSchema);