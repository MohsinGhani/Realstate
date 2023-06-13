"use client";

import React, { useEffect } from "react";
import Login from "@/components/Login";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      router.push("/levels");
    }
  }, [user?.id]);

  return <Login />;
};

export default LoginPage;
