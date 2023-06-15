const { getItemByQuery } = require("../lib/helper");
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function userDetail(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    // for update Data
    if (!!params.id) {
      const updateParams = {
        TableName: "realEstate-users",
        Key: { id: params.id },
        UpdateExpression: "SET",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
      };

      const updateValues = { ...params };

      delete updateValues.id;
      delete updateValues.userId;

      Object.entries(updateValues).forEach(([key, value]) => {
        if (key !== "id" && value) {
          const expressionName = `#${key}`;
          const expressionValue = `:${key}`;

          updateParams.UpdateExpression += ` ${expressionName} = ${expressionValue},`;
          updateParams.ExpressionAttributeNames[expressionName] = key;
          updateParams.ExpressionAttributeValues[expressionValue] = value;
        }
      });

      updateParams.UpdateExpression = updateParams.UpdateExpression.slice(
        0,
        -1
      );

      await ddb.update(updateParams).promise();
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
