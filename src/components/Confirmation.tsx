import { Form, Input, Typography } from "antd";
import React from "react";

const Confirmation = () => {
  return (
    <div>
      <Form>
        <Typography className="text-left text-2xl  mb-2 font-medium">
          Confirmation Code
        </Typography>
        <Form.Item name="addressLine2">
          <Input placeholder="Code" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Confirmation;
