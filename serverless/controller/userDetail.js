const { getItemByQuery, upDateItemByQuery } = require("../lib/helper");
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function userDetail(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    // for update Data
    if (!!params.id) {
      const updateValues = { ...params };

      const fieldsToDelete = [
        "id",
        "userId",
        "confirm",
        "confirmationCode",
        "password",
      ];

      fieldsToDelete.forEach((field) => delete updateValues[field]);

      await upDateItemByQuery({
        TableName: "realEstate-users",
        keyId: params.id,
        params: updateValues,
      });
    }

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

exports.userDetail = userDetail;
