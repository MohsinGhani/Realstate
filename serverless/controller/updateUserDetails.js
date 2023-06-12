const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function updateUserDetails(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    delete params.confirm;
    delete params.confirmationCode;

    const userParams = {
      TableName: "realEstate-users",
      Item: {
        ...params,
      },
    };

    await ddb.put(userParams).promise();

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

exports.updateUserDetails = updateUserDetails;
