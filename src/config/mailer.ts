const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'eCommerseTeam@gmail.com',
        pass: 'kuzanovi0000'
    }, 
    tls:{
        rejectUnauthorized:false
    }
});