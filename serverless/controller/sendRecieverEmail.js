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
      subject: "send email with attachment",
      // text: 'Hello, this is a send email with attachment',

      html: `<a href="${params?.link}" target="_blank">send email with attachment</a>`,
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
