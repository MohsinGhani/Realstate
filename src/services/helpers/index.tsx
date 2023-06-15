import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

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

export { isTokenExpire, uselocalstorage, getUserId };
