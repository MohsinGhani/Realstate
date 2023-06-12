const aws = require("aws-sdk");
const ddb = new aws.DynamoDB.DocumentClient({});

const generateId = (length) => {
  let UID = "";
  let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    UID += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return UID;
};

const getUniqueItemFromArr = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

const getItemByQuery = ({
  table,
  KeyConditionExpression,
  ExpressionAttributeNames,
  ExpressionAttributeValues,
  IndexName,
  Limit,
  ExclusiveStartKey,
  ScanIndexForward,
  FilterExpression,
}) => {
  var params = {
    TableName: table,
    KeyConditionExpression,
    ExpressionAttributeValues,
  };

  if (ExpressionAttributeNames) {
    params["ExpressionAttributeNames"] = ExpressionAttributeNames;
  }
  if (IndexName) {
    params["IndexName"] = IndexName;
  }
  if (Limit) {
    params["Limit"] = Limit;
  }
  if (ExclusiveStartKey) {
    params["ExclusiveStartKey"] = ExclusiveStartKey;
  }
  if (ScanIndexForward) {
    params["ScanIndexForward"] = ScanIndexForward;
  }
  if (FilterExpression) {
    params["FilterExpression"] = FilterExpression;
  }

  return ddb.query(params).promise();
};

module.exports = {
  generateId,
  getUniqueItemFromArr,
  getItemByQuery,
};
