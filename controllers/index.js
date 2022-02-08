const Contact = require('../models/contact');
const sendMail = require('../utils/ses');

module.exports = {

    contactUs: async (req, res, next) => {
        const { fname, lname, email, department, message } = req.body;
        if(!fname || !lname || !email || !message) {
            return res.json({
                success: false,
                msg: "Please fill all the fields!"
            });
        }
        const msg = `Email From ${fname} ${lname} of ${department} department.
                    Message: ${message}`;
        await sendMail(process.env.EMAIL, email, msg);
        const contact = new Contact(req.body);
        await contact.save();         
        res.json({
            success: true,
            msg: "Message sent successfully! We'll contact you soon!"
        });    
    }

}