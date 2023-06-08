"use strict";

const { sendRecieverEmail } = require("./controller/sendRecieverEmail");

module.exports.sendRecieverEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return sendRecieverEmail(event, context, callback);
};
