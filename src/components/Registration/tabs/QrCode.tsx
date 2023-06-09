import { Form, Input, Typography } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import QRCode from "qrcode.react";

interface QrCode {
  form: FormInstance;
  required: any;
  isEditable: any;
}
const QrCode: React.FC<QrCode> = ({ form, required, isEditable }) => {
  const value = form.getFieldsValue();
  let link: any = "";
  if (typeof window !== "undefined") {
    link = `${window?.location?.origin}/registration?street=${value?.street}&city=${value?.city}&state=${value?.state}&zipCode=${value?.zipCode}&contractorCode=${value?.contractorCode}`;
  }

  return (
    <div>
      <Typography className="flex justify-center items-center text-1xl  mb-6 font-medium">
        Address
      </Typography>
      <div className="flex justify-center items-center mb-8">
        <QRCode
          value={link}
          size={250}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
        />
      </div>
      <Typography className="text-left text-2xl mb-6 font-medium">
        Reciever Email
      </Typography>
      <Form form={form} disabled={isEditable}>
        <Form.Item name="recieverEmail" rules={[{ type: "email", required }]}>
          <Input placeholder="Email" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default QrCode;
