"use client";

import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/common/withAuth";

const LandingPage = () => {
  const router = useRouter();

  return (
    <Button
      type="primary"
      className="flex"
      onClick={() => {
        router.push("/levels");
      }}
    >
      House Level
    </Button>
  );
};

export default withAuth(LandingPage);
