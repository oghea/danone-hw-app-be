const nodemailer = require('nodemailer');

exports.contactUs = async (ctx) => {
  const {
    name,
    email,
    address,
    phone,
    nationality,
    message
  } = ctx.request.body


  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2ee8c47f78d34e",
      pass: "1099e223ef3dbd"
    }
  });

  const mailOptions = {
    from: 'noone@anonymous.com',
    to: 'a.pprayoga18@gmail.com',
    subject: 'Sending Email using Node.js[nodemailer]',
    text: `
    Name: ${name}
    Email: ${email}
    Address: ${address}
    Phone: ${phone}
    Nationality: ${nationality}
    Message: ${message}
    `
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      ctx.body = 'eror' + error;
    } else {
      console.log('Email sent: ' + info.response);
      ctx.body = 'success';
    }
  });

  ctx.body = 'success';
}