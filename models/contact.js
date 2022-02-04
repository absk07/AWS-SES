const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Conatct', contactSchema);