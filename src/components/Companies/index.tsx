"use client";
import React, { useState } from "react";
import { Button, Space, Steps } from "antd";
import { useRouter } from "next/navigation";
import Login from "./tabs/Login";
import QrCode from "./tabs/QrCode";
import OwnerDetails from "./tabs/OwnerDetails";
import Confirmation from "./tabs/Confirmation";

const steps = [
  {
    title: "Address",
    content: <Login />,
  },
  {
    title: "QR code",
    content: <QrCode />,
  },
  {
    title: "Owner  Details ",
    content: <OwnerDetails />,
  },
  {
    title: "Confirmation",
    content: <Confirmation />,
  },
];
const Companies = () => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div>
      <Steps current={current} items={items} labelPlacement="vertical" />
      <br />
      <br />

      {steps[current].content}

      <div className="flex justify-end">
        <Space>
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                router.push("/landingPage");
              }}
            >
              {current !== 3 ? "Done" : "Confirm"}
            </Button>
          )}

          {current > 0 && (
            <Button onClick={() => prev()}>
              {current !== 3 ? "Previous" : "Resend"}
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default Companies;
