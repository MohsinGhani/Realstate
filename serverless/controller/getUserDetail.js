const { getItemByQuery } = require("../lib/helper");

async function getUserDetail(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    // for get Data
    const data = await getItemByQuery({
      table: "realEstate-users",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": params.userId,
      },
    });

    return callback(null, {
      body: JSON.stringify(data?.Items),
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

exports.getUserDetail = getUserDetail;
