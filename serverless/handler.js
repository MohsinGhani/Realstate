"use strict";

const { sendRecieverEmail } = require("./controller/sendRecieverEmail");
const { putUsersInDB } = require("./controller/putUsersInDB");
const { userFloors } = require("./controller/userFloors");
const { userRooms } = require("./controller/userRooms");
const { userDetail } = require("./controller/userDetail");
const { userExterior } = require("./controller/userExterior");

module.exports.userExterior = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userExterior(event, context, callback);
};
module.exports.userDetail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userDetail(event, context, callback);
};
module.exports.userRooms = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userRooms(event, context, callback);
};
module.exports.userFloors = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return userFloors(event, context, callback);
};
module.exports.putUsersInDB = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return putUsersInDB(event, context, callback);
};
module.exports.sendRecieverEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return sendRecieverEmail(event, context, callback);
};
