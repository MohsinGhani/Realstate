"use client";
import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import Login from "./AddressBar";
import QrCode from "./QrCode";
import OwnerDetails from "./OwnerDetails";
import Confirmation from "./Confirmation";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/router";

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
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,

    borderRadius: token.borderRadiusLG,

    marginTop: 16,
  };
  return (
    <div>
      <div className="w-2/6 m-auto mt-10 ">
        <Steps
          className="w-10/6 "
          current={current}
          items={items}
          labelPlacement="vertical"
        />
        <div
          style={{
            height: "500px",
            marginTop: "100px",
          }}
        >
          {steps[current].content}{" "}
        </div>
        <div className="flex justify-end  mr-3">
          {current === steps.length - 1 && (
            <Button
              // type="dashed"
              className="bg-yellow-400"
              onClick={() => {
                // if (current !== 3) {
                router.push("/landingPage");
                // }
              }}
            >
              {current !== 3 ? "Done" : "Confirm"}
            </Button>
          )}

          {current > 0 && (
            <Button
              className="bg-yellow-400 text-black"
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
            >
              {current !== 3 ? "Previous" : "Resend"}
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              // type="dashed"
              className="bg-yellow-400 text-black"
              onClick={() => next()}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
