const Contact = require('../models/contact');
const Enquiry = require('../models/enquiry');
const Count = require('../models/count');
const sendMail = require('../utils/ses');

const fetch = require('isomorphic-fetch');

module.exports = {

    contactUs: async (req, res, next) => {
        const { fname, lname, email, department, message } = req.body;
        const msg = `Email From ${fname} ${lname} of ${department} department.
                    Message: ${message}`;
        await sendMail(process.env.EMAIL, email, msg);
        const contact = new Contact(req.body);
        await contact.save();         
        res.json({
            success: true,
            msg: "Message sent successfully! We'll contact you soon!"
        });    
    },

    enquiry: async (req, res, next) => {
        const { name, email, organization, unit, message } = req.body;
        const msg = `Email From ${name} of ${organization} organization.
                    Mr/Ms/Mrs. ${name} requested for ${unit} ${unit > 1 ? 'units' : 'unit'} of your product.    
                    Message: ${message}`;
        await sendMail(process.env.EMAIL, email, msg);   
        const enquiry = new Enquiry(req.body);
        await enquiry.save();       
        res.json({
            success: true,
            msg: "Message sent successfully! We'll contact you soon!"
        });
    },

    captcha: async (req, res, next) => {
        const { response } = req.body;
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${response}`;
        const responseData = await fetch(url, {
            method: 'POST',
        });
        const google_response = await responseData.json();
        if(google_response.success) {
            res.json({
                success: true,
                msg: "Captcha verified successfully!"
            });
        } else {
            res.json({
                success: false,
                msg: "Captcha verification failed!"
            });
        }
    },

    getCount: async (req, res, next) => {
        const count = await Count.find({}).sort({ _id: -1 }).limit(1);
        res.json({
            success: true,
            data: count
        });
    }

}