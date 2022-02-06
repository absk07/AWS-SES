const express = require('express');
const router = express.Router();

const catchAsyncErr = require('../utils/asyncHandler');

const { contactUs, enquiry, captcha, liveCount } = require('../controllers/index');

router.post('/contactUs', catchAsyncErr(contactUs));

router.post('/enquiry', catchAsyncErr(enquiry));

router.post('/verifyCaptcha', catchAsyncErr(captcha));

router.post('/live-count', catchAsyncErr(liveCount));

module.exports = router;