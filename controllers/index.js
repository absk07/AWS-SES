const Contact = require('../models/contact');
const Enquiry = require('../models/enquiry');
const sendMail = require('../utils/ses');

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
            msg: "Message sent successfully!"
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
            msg: "Message sent successfully!"
        });
    }

}