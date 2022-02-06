const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countSchema = new Schema({
    fruitQuantity: {
        type: Number,
        required: true
    },
    totalFruit: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Count', countSchema);