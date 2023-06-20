const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const currentEnv = process.env.NEXT_PUBLIC_CURRENT_ENV;

const API = {
  RECIEVER_Email: `${baseUrl}/${currentEnv}/api/sendRecieverEmail`,
  USER_FLOORS: `${baseUrl}/${currentEnv}/api/userFloors`,
  USER_ROOMS: `${baseUrl}/${currentEnv}/api/userRooms`,
  USER_DETAILS: `${baseUrl}/${currentEnv}/api/userDetail`,
  USER_EXTERIOR: `${baseUrl}/${currentEnv}/api/userExterior`,
};

export { API, currentEnv };
