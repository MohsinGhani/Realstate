"use client";
import React, { useEffect } from "react";
import Registration from "@/components/Registration";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const { user } = useAppSelector((state: any) => state?.userReducer);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      router.push("/levels");
    }
  }, [user?.id]);

  return <Registration />;
};

export default RegistrationPage;
