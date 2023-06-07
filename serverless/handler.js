"use strict";

const { test } = require("./controller/test");

module.exports.test = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return test(event, context, callback);
};
