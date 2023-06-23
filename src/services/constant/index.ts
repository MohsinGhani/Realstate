const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const currentEnv = process.env.NEXT_PUBLIC_CURRENT_ENV;

const API = {
  RECIEVER_Email: `${baseUrl}/${currentEnv}/api/sendRecieverEmail`,
  USER_EXPLORE: `${baseUrl}/${currentEnv}/api/userExplore`,
  USER_DETAILS: `${baseUrl}/${currentEnv}/api/userDetail`,
};

const typeDetailRoom = [
  {
    name: "InstallDate",
    type: "date",
    required: false,
  },
  {
    name: "Warranty",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "Picture",
    type: "image",
    required: false,
    max: 1,
  },
  {
    name: "Receipt",
    type: "image",
    required: false,
    max: 1,
  },
];

const typeDetailExterior = [
  {
    name: "RoofMaterial",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "ShingleBrand",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "Color",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "Underlayment",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "RoofSize",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "EdgeMetalColor",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "Cost",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "ContractorName",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "InstallDate",
    type: "date",
    required: false,
  },
  {
    name: "Warranty",
    min: 0,
    max: 100,
    type: "string",
    required: false,
  },
  {
    name: "ProjectPhotos",
    type: "image",
    required: false,
    max: 3,
  },
  {
    name: "WarrantyPhotos",
    type: "image",
    required: false,
    max: 3,
  },
];
export { API, currentEnv, typeDetailRoom, typeDetailExterior };
