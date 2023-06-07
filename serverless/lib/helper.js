/* eslint-disable */
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

module.exports = {
  generateId,
  getUniqueItemFromArr,
};
