"use client";

import React, { useEffect } from "react";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOutUser } from "@/redux/features/userSlice";
import { fetchUserData } from "@/services/helpers";
import { useAxo } from "@/services/helpers/api";
import { API } from "@/services/constant";

const Header = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const dispatch = useAppDispatch();
  const [{}, userDetailsPost] = useAxo("post", API.USER_DETAILS);

  useEffect(() => {
    fetchUserData(userDetailsPost, dispatch);
  }, []);

  return (
    <div className="block w-full shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white sticky inset-0 h-max max-w-full rounded py-2 px-4 lg:px-8 lg:py-4 mb-8 z-50">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between">
        <img
          src="https://cdn.dribbble.com/users/1070235/screenshots/5325568/lightning_sewer.png"
          alt="Logo"
          width={50}
        />

        <Space>
          {!user?.id && (
            <Space>
              <Button
                onClick={() => {
                  router.push("/login");
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  router.push("/registration");
                }}
                type="primary"
              >
                Sign up
              </Button>
            </Space>
          )}
          {user?.id && (
            <Button
              onClick={() => {
                dispatch(logOutUser(router));
              }}
            >
              Log out
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default Header;
