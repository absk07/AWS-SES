const express = require('express');
const router = express.Router();

const catchAsyncErr = require('../utils/asyncHandler');

const { contactUs, enquiry, captcha, getCount } = require('../controllers/index');

router.post('/contactUs', catchAsyncErr(contactUs));

router.post('/enquiry', catchAsyncErr(enquiry));

router.post('/verifyCaptcha', catchAsyncErr(captcha));

router.get('/getCount', catchAsyncErr(getCount));

module.exports = router;