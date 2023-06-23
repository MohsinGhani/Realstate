"use strict";

const { sendRecieverEmail } = require("./controller/sendRecieverEmail");
const { putUsersInDB } = require("./controller/putUsersInDB");
const { userExplore } = require("./controller/userExplore");
const { userDetail } = require("./controller/userDetail");

module.exports.userDetail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userDetail(event, context, callback);
};
module.exports.userExplore = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userExplore(event, context, callback);
};
module.exports.putUsersInDB = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return putUsersInDB(event, context, callback);
};
module.exports.sendRecieverEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return sendRecieverEmail(event, context, callback);
};
