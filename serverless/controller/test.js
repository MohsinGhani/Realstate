const QRCode = require("qrcode");
const { sendMail } = require("../lib/emailTemplates");

async function test(event, context, callback) {
  // const { emailAddress, link } = event;

  console.log("🚀  event:", event);
  try {
    // Generate QR code data URL
    const qrCodeDataURL = await QRCode.toDataURL(
      "http://localhost:3000/landingPage/asdasd"
    );

    const qrCodeURL = await QRCode.toDataURL("https://codedamn.com");

    // Send email with QR code as attachment
    const params = {
      from: "mohsinghani.777@gmail.com",
      to: "syedrahmeer12@gmail.com",
      subject: "Test email with attachment",
      // text: 'Hello, this is a test email with attachment',
      html: `
      <div className="">
      
      <img src="${qrCodeURL}" alt="QR Code for codedamn.com"/>
      <img src="cid:qrcode.png"/>
      
      </div>
      `,

      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeDataURL.split(";base64,").pop(),
          encoding: "base64",
        },
      ],
    };

    await sendMail(params);

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

exports.test = test;
