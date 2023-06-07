/* eslint-disable */
const AWS = require("aws-sdk");
const ses = new AWS.SES();
const nodemailer = require("nodemailer");

const sendMail = async (email) => {
  const transporter = nodemailer.createTransport({
    SES: ses,
  });

  return await transporter.sendMail(email);
};

module.exports = {
  sendMail,
};
