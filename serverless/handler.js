"use strict";

const { sendRecieverEmail } = require("./controller/sendRecieverEmail");
const { putUsersInDB } = require("./controller/putUsersInDB");
const { updateUserDetails } = require("./controller/updateUserDetails");
const { userFloors } = require("./controller/userFloors");
const { userRooms } = require("./controller/userRooms");
const { getUserDetail } = require("./controller/getUserDetail");

module.exports.getUserDetail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return getUserDetail(event, context, callback);
};
module.exports.userRooms = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userRooms(event, context, callback);
};
module.exports.userFloors = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userFloors(event, context, callback);
};
module.exports.updateUserDetails = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return updateUserDetails(event, context, callback);
};
module.exports.putUsersInDB = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return putUsersInDB(event, context, callback);
};
module.exports.sendRecieverEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return sendRecieverEmail(event, context, callback);
};
