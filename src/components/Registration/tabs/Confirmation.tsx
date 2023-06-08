import { Form, Input, Typography } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";

interface Confirmation {
  form: FormInstance;
  required: any;
}

const Confirmation: React.FC<Confirmation> = ({ form, required }) => {
  return (
    <div>
      <Form form={form}>
        <Typography className="text-left text-2xl  mb-2 font-medium">
          Confirmation Code
        </Typography>
        <Form.Item name="confirmationCode" rules={[{ required }]}>
          <Input placeholder="Code" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Confirmation;
