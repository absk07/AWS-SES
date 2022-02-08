const express = require('express');
const router = express.Router();

const catchAsyncErr = require('../utils/asyncHandler');

const { contactUs } = require('../controllers/index');

router.post('/contactUs', catchAsyncErr(contactUs));

module.exports = router;