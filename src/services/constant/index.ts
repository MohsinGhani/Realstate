// const baseUrl = process.env.REACT_APP_BASE_URL;
// const currentEnv = process.env.REACT_APP_ENV;

const baseUrl = "https://drp0bla4wf.execute-api.us-east-2.amazonaws.com";
const currentEnv = "dev";
const API = {
  RECIEVER_Email: `${baseUrl}/${currentEnv}/api/sendRecieverEmail`,
  USER_FLOORS: `${baseUrl}/${currentEnv}/api/userFloors`,
  USER_ROOMS: `${baseUrl}/${currentEnv}/api/userRooms`,
  USER_DETAILS: `${baseUrl}/${currentEnv}/api/userDetail`,
};

export { API, currentEnv };
