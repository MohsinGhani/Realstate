import { Form, Input, Typography } from "antd";
import React from "react";

const QrCode = () => {
  return (
    <div>
      <Typography className="flex justify-center items-center text-1xl  mb-6 font-medium">
        Address
      </Typography>
      <div className="flex justify-center items-center mb-0">
        <img src="/assets/images/qrcode_example_1.png" />
      </div>
      <Form className="w-11/12 ml-9 mt-10">
        <Typography className="text-1xl   font-medium">Email</Typography>
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please enter your state" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default QrCode;
