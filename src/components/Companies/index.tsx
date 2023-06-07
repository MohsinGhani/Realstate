"use client";

import React, { useState } from "react";
import { Button, Form, Space, Steps } from "antd";
import { useRouter } from "next/navigation";
import Address from "./tabs/Address";
import QrCode from "./tabs/QrCode";
import OwnerDetails from "./tabs/OwnerDetails";
import Confirmation from "./tabs/Confirmation";
import { signup } from "../../services/AuthService";

const Companies = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [current, setCurrent] = useState(0);

  const next = async () => {
    try {
      const value = await form.validateFields();
      // const value = await form.getFieldsValue();
      console.log("🚀  value:", value);

      // const res = await signup({
      //   password: value.Password,
      //   username: value.Email,
      //   email: value.Email,
      // });
      // console.log("🚀  res:", res);

      setCurrent(current + 1);
    } catch (err) {
      console.log("🚀 ~ err:", err);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Address",
      content: <Address form={form} />,
    },
    {
      title: "QR code",
      content: <QrCode form={form} />,
    },
    {
      title: "Owner  Details ",
      content: <OwnerDetails form={form} />,
    },
    {
      title: "Confirmation",
      content: <Confirmation form={form} />,
    },
  ];

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
