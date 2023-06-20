const { getItemByQuery } = require("../lib/helper");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function userFloors(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    // for AddData
    if (!!params.name && !params.id) {
      const userParams = {
        TableName: "realEstate-floors",
        Item: {
          id: uuidv4(),
          createdBy: params.userId,
          name: params.name,
          createdAt: new Date().getTime(),
        },
      };

      await ddb.put(userParams).promise();
    }
    // for update Data
    if (!!params.name && !!params.id) {
      const updateParams = {
        TableName: "realEstate-floors",
        Key: { id: params.id },
        UpdateExpression: "SET #name = :name",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": params.name,
        },
      };

      await ddb.update(updateParams).promise();
    }

    // for delete Data
    if (!!params.deleteId) {
      const deleteParams = {
        TableName: "realEstate-floors",
        Key: { id: params.deleteId },
      };

      await ddb.delete(deleteParams).promise();
    }

    // for get Data
    const data = await getItemByQuery({
      table: "realEstate-floors",
      IndexName: "createdBy",
      KeyConditionExpression: "createdBy = :createdBy",
      ExpressionAttributeValues: {
        ":createdBy": params.userId,
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

exports.userFloors = userFloors;
