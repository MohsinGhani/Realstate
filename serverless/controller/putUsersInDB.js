const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

async function putUsersInDB(event, context, callback) {
  const params = event?.request?.userAttributes;

  try {
    const userParams = {
      TableName: "realEstate-users",
      Item: {
        id: params?.sub,
        email: params?.email,
      },
    };

    await ddb.put(userParams).promise();

    return callback(null, event);
  } catch (err) {
    console.log("🚀  err:", err);
    throw err;
  }
}

exports.putUsersInDB = putUsersInDB;
