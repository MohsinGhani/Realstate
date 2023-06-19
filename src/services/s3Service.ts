import { Storage } from "aws-amplify";

const defaultPrefix = {
  public: "",
  protected: "",
  private: "",
};

const putFileToS3 = (
  key: any,
  file: any,
  contentType = "image/*",
  customPrefix = defaultPrefix
) => {
  return new Promise((resolve: any, reject: any) => {
    Storage.put(key, file, {
      customPrefix,
      contentType,
    })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const removeFileToS3 = (key: any, customPrefix: any = defaultPrefix) => {
  return new Promise((resolve: any, reject: any) => {
    Storage.remove(key, {
      customPrefix,
    })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

// const generatePreSignedGetUrl = async (
//   key,
//   contentType = "image/*",
//   customPrefix = defaultPrefix
// ) => {
//   return new Promise((resolve, reject) => {
//     Storage.get(key, {
//       contentType,
//       customPrefix,
//     })
//       .then((url) => resolve(url))
//       .catch((error) => reject(error));
//   });
// };

// const getBase64FromS3Key = (key) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await Storage.get(key, {
//         download: true,
//         customPrefix: { ...defaultPrefix },
//       });

//       const image = new Image();

//       image.onload = function () {
//         const canvas = document.createElement("canvas");
//         canvas.width = image.width;
//         canvas.height = image.height;
//         const context = canvas.getContext("2d");
//         context.drawImage(image, 0, 0);
//         const dataURL = canvas.toDataURL("image/png");
//         resolve(dataURL);
//       };
//       const base64 = Buffer.from(await response.Body.arrayBuffer()).toString(
//         "base64"
//       );
//       image.src = `data:image/webp;base64,${base64}`;
//     } catch (e) {
//       reject();
//     }
//   });
// };

// const downloadCsvFromS3 = async (key, fileName = "fileName") => {
//   try {
//     const file = await Storage.get(key, { download: true });
//     const blob = new Blob([file.Body], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     // Create a link element and trigger click event to download
//     const link = document.createElement("a");
//     link.href = url;
//     // link.download = `${fileName}.csv`
//     link.download = `${fileName}`;
//     document.body.appendChild(link);
//     link.click();
//   } catch (error) {
//     console.error("Error downloading file:", error);
//   }
// };

export {
  putFileToS3,
  removeFileToS3,
  // generatePreSignedGetUrl,
  // getBase64FromS3Key,
  // downloadCsvFromS3,
};
