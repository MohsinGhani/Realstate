const AWS = require("aws-sdk");
let Credentials = require(`./../config/config.${process.env.ENV}.json`);
const s3 = new AWS.S3();

const uploadToS3 = (file, foldername) => {
  // console.log('file to upload s3', file)
  let s3bucket = new AWS.S3({
    params: { Bucket: `${Credentials.BUCKET}/${foldername}` },
  });

  var params = {
    Key: file.filename,
    Body: file.content,
  };

  if (file["meta"]) {
    params["Metadata"] = file["meta"];
  }
  return s3bucket.upload(params).promise();
};

const getSignedUrl = (Key, Expires) => {
  return new Promise((resolve, reject) => {
    return s3.getSignedUrl(
      "getObject",
      {
        Bucket: Credentials.BUCKET,
        Key,
        Expires: Expires ? Expires : 7200, // two hours
      },
      (error, url) => {
        if (error) {
          reject(error);
        } else {
          resolve(url);
        }
      }
    );
  });
};

const getImageInBase64String = (Key, withUrl) => {
  return new Promise((resolve, reject) => {
    return s3.getObject(
      {
        Bucket: Credentials.BUCKET,
        Key,
      },
      (error, file) => {
        if (error) {
          reject(error);
        } else {
          if (withUrl) {
            console.log("with url", JSON.stringify(file.Metadata));
            return getSignedUrl(Key)
              .then((url) => {
                console.log("url", url);
                resolve({
                  meta: file.Metadata,
                  base64:
                    "data:image/jpeg;base64," +
                    Buffer.from(file.Body).toString("base64"),
                  url,
                });
              })
              .catch((error) => {
                console.log("error in getting url", error);
                resolve({
                  meta: file.Metadata,
                  base64:
                    "data:image/jpeg;base64," +
                    Buffer.from(file.Body).toString("base64"),
                });
              });
          } else {
            console.log("without url");

            resolve({
              meta: file.Metadata,
              base64:
                "data:image/jpeg;base64," +
                Buffer.from(file.Body).toString("base64"),
            });
          }
        }
      }
    );
  });
};

const deleteObjectFromS3 = (Key) => {
  return new Promise((resolve, reject) => {
    return s3.deleteObject(
      {
        Bucket: Credentials.BUCKET,
        Key,
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const getObjectFromS3 = (Key) => {
  return new Promise((resolve, reject) => {
    return s3
      .getObject(
        {
          Bucket: Credentials.BUCKET,
          Key,
        },
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      )
      .createReadStream();
  });
};

const copyObjectToS3 = (key, newKey, metadataDirective, metaData) => {
  return new Promise((resolve, reject) => {
    return s3.copyObject(
      {
        Bucket: Credentials.BUCKET,
        CopySource: `${Credentials.BUCKET}/${key}`,
        Key: newKey,
        MetadataDirective: metadataDirective,
        Metadata: metaData,
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = {
  uploadToS3,
  getSignedUrl,
  getImageInBase64String,
  deleteObjectFromS3,
  getObjectFromS3,
  copyObjectToS3,
};
