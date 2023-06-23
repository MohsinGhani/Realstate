const QRCode = require("qrcode");
const { sendMail } = require("../lib/emailTemplates");

async function sendRecieverEmail(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    const qrCodeDataURL = await QRCode.toDataURL(params?.link);

    // Send email with QR code as attachment
    const payload = {
      from: "mohsinghani.777@gmail.com",
      to: "syedrahmeer12@gmail.com",
      subject: "Real Estate - Proceed with Signup Process",
      html: `
      <p>Thank you for choosing our Real Estate platform. We are delighted to have you on board and assist you in your property</p>
      <p>To continue with the signup process, please follow the steps outlined below:</p>
      <a href="${params?.link}" target="_blank">Click here to proceed signup process</a>
      `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeDataURL.split(";base64,").pop(),
          encoding: "base64",
        },
      ],
    };

    await sendMail(payload);

    return callback(null, {
      body: JSON.stringify("done"),
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  } catch (err) {
    console.log("🚀  err:", err);
    throw err;
  }
}

exports.sendRecieverEmail = sendRecieverEmail;
