const nodemailer = require("nodemailer");

async function mailer(content) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Pet-Store" <${process.env.ADMIN_MAIL}>`,
    to: process.env.ADMIN_MAIL,
    subject: "Pet Store Notification",
    html: content,
  });

  // console.log(info.messageId);
}

module.exports = { mailer };
