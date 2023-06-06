import { Form, Input, Typography } from "antd";
import React from "react";

const Confirmation = ({ form }: any) => {
  return (
    <div>
      <Form form={form}>
        <Typography className="text-left text-2xl  mb-2 font-medium">
          Confirmation Code
        </Typography>
        <Form.Item
          name="confirmationCode"
          rules={[
            { required: true, message: "Please enter your Confirmation Code" },
          ]}
        >
          <Input placeholder="Code" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Confirmation;
