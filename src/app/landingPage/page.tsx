"use client";
import { Button, Form, Input, Steps, Typography } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="w-full flex  text-black justify-center items-center ">
      <div
        className="flex  shadow-neutral-950"
        style={{
          display: "flex",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          color: "black",
          height: " 500px",
          width: "30%",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          style={{
            display: "flex",
            backgroundColor: "#F9C70C",
            border: "none",
            color: "black",
            width: "100px",
            textAlign: "center",
            margin: "20px",
          }}
          onClick={() => {
            router.push("/dataTable");
          }}
        >
          House Level
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
