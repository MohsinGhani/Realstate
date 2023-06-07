import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import QRCode from "qrcode.react";

interface QrCode {
  form: FormInstance;
}
const QrCode: React.FC<QrCode> = ({ form }) => {
  const link = "http://localhost:3000/landingPage/asdasd";

  return (
    <div>
      <Typography className="flex justify-center items-center text-1xl  mb-6 font-medium">
        Address
      </Typography>
      <div className="flex justify-center items-center mb-0">
        <QRCode
          value={link}
          size={250}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
        />
      </div>
      <Form form={form} className="mt-10">
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
