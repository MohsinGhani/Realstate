const { getItemByQuery, upDateItemByQuery } = require("../lib/helper");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function userExplore(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    // for add Data
    if (!!params.name && !params.id) {
      const userParams = {
        TableName: "realEstate-explore",
        Item: {
          id: uuidv4(),
          createdBy: params.userId,
          name: params.name,
          roomLevel: params.roomLevel,
          role: params.role,
          brand: params.brand,
          type: params.type,
          typeField: params.typeField,
          createdAt: new Date().getTime(),
        },
      };

      await ddb.put(userParams).promise();
    }

    // for update Data
    if (!!params.name && !!params.id) {
      const updateValues = {
        name: params.name,
        roomLevel: params.roomLevel,
        brand: params.brand,
        type: params.type,
        typeField: params.typeField,
      };

      await upDateItemByQuery({
        TableName: "realEstate-explore",
        keyId: params.id,
        params: updateValues,
      });
    }

    // // for delete Data
    if (!!params.deleteId) {
      const deleteParams = {
        TableName: "realEstate-explore",
        Key: { id: params.deleteId },
      };

      await ddb.delete(deleteParams).promise();
    }

    // for get Data
    const data = await getItemByQuery({
      table: "realEstate-explore",
      IndexName: "createdBy",
      ExpressionAttributeNames: { "#role": "role", "#createdBy": "createdBy" },
      KeyConditionExpression: "#createdBy = :createdBy",
      FilterExpression: "#role = :role",
      ExpressionAttributeValues: {
        ":createdBy": params.userId,
        ":role": params.role,
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

exports.userExplore = userExplore;
