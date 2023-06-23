import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { addUserDetails } from "@/redux/features/userSlice";

const isTokenExpire = (token: any) => {
  try {
    const decode: any = jwt_decode(token);
    if (Date.now() >= decode.exp * 1000) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("e:", e);
    return false;
  }
};

const uselocalstorage = (key: any, value: any) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getUserId = () => {
  const allCookies = Cookies.get();

  if (allCookies) {
    const LastAuthUserToken = Object.keys(allCookies || []).filter((k) =>
      k.includes("LastAuthUser")
    );
    const userIdToken = allCookies[LastAuthUserToken[0]];
    return userIdToken;
  }
};

const fetchUserData = async (userDetailsPost: any, dispatch: any) => {
  const allCookies = Cookies.get();
  if (allCookies) {
    const getAcceessToken = Object.keys(allCookies || []).filter((k) =>
      k.includes("accessToken")
    );
    const jwtToken = allCookies[getAcceessToken[0]];
    if (jwtToken && !isTokenExpire(jwtToken)) {
      const getUserId = Object.keys(allCookies || []).filter((k) =>
        k.includes("LastAuthUser")
      );

      const res: any = await userDetailsPost({
        userId: allCookies[getUserId[0]],
      });

      dispatch(
        addUserDetails({
          ...res?.[0],
        })
      );
    }
  }
};

const capitalizeFirstLetter = (string: any) => {
  const word = string?.toLowerCase();
  return word?.charAt(0).toUpperCase() + word?.slice(1);
};

export {
  isTokenExpire,
  uselocalstorage,
  getUserId,
  fetchUserData,
  capitalizeFirstLetter,
};
