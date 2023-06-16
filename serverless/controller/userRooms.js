const { getItemByQuery } = require("../lib/helper");
const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function userRooms(event, context, callback) {
  let params = JSON.parse(event.body);
  console.log("🚀 ~ params", params);

  try {
    // for add Data
    if (!!params.name && !params.id) {
      const userParams = {
        TableName: "realEstate-rooms",
        Item: {
          id: uuidv4(),
          createdBy: params.userId,
          floorId: params.floorId,
          name: params.name,
          type: params.type,
          typeField: params.typeField,
          createdAt: new Date().getTime(),
        },
      };

      await ddb.put(userParams).promise();
    }

    // for update Data
    if (!!params.name && !!params.id) {
      const updateParams = {
        TableName: "realEstate-rooms",
        Key: { id: params.id },
        UpdateExpression:
          "SET #name = :name, #type = :type, #typeField = :typeField",
        ExpressionAttributeNames: {
          "#name": "name",
          "#type": "type",
          "#typeField": "typeField",
        },
        ExpressionAttributeValues: {
          ":name": params.name,
          ":type": params.type,
          ":typeField": params.typeField,
        },
      };

      await ddb.update(updateParams).promise();
    }

    // // for delete Data
    if (!!params.deleteId) {
      const deleteParams = {
        TableName: "realEstate-rooms",
        Key: { id: params.deleteId },
      };

      await ddb.delete(deleteParams).promise();
    }

    // for get Data
    const data = await getItemByQuery({
      table: "realEstate-rooms",
      IndexName: "floorId",
      KeyConditionExpression: "floorId = :floorId",
      ExpressionAttributeValues: {
        ":floorId": params.floorId,
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

exports.userRooms = userRooms;
