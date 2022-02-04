const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Enquiry', enquirySchema);