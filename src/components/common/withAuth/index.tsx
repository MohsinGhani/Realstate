import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { isTokenExpire } from "@/services/helpers";
import { useRouter } from "next/navigation";
import { addUserDetails, logOutUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";

const withAuth = (Comp: any) => {
  function AuthenticatedRoute(props: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [userData, setUser] = useState("");

    useEffect(() => {
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
          dispatch(addUserDetails({ id: allCookies[getUserId[0]] }));
          setUser(jwtToken);
        } else {
          dispatch(logOutUser(router));
        }
      }
    }, []);

    return userData === "" ? "loading" : <Comp {...props} />;
  }

  return AuthenticatedRoute;
};

export default withAuth;
