const sgMail = require('@sendgrid/mail');
const { MAIL_KEY, MAIL_FROM } = require("./config");

sgMail.setApiKey(MAIL_KEY);
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: MAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    const result = await sgMail.send(mailOptions);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {sendEmail}