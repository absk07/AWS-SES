const express = require('express');
const router = express.Router();

const catchAsyncErr = require('../utils/asyncHandler');

const { contactUs, enquiry } = require('../controllers/index');

router.post('/contactUs', catchAsyncErr(contactUs));

router.post('/enquiry', catchAsyncErr(enquiry));

module.exports = router;