"use client";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <Button
      type="primary"
      className="flex"
      onClick={() => {
        router.push("/dataTable");
      }}
    >
      House Level
    </Button>
  );
};

export default LandingPage;
