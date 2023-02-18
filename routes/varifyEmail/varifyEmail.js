const nodemailer = require("nodemailer");

// send Email
const varifyEmail = async (subject, emailTo, message) => {
  // sending Email

  var smtpEmail = process.env.SMTP_EMAIL;
  var smtpPass = process.env.SMTP_Pass;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpEmail, // generated ethereal user
      pass: smtpPass, // generated ethereal password
    },
  });

  var mailOptions = {
    from: smtpEmail,
    to: emailTo,
    subject: subject,
    html: message,
  };

  // sending varifying email to registerd user
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log("Email Sent Successfully");
      return { msg: "email not send due to some error" };
    } else {
      console.log("Email Sent Successfully");
      return { success: true, msg: "email send successfully" };
    }
  });
};

// exportin function to generate Varifyed Email
module.exports = varifyEmail;
