import { Form, Input, Typography } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";

interface OwnerDetails {
  form: FormInstance;
}

const OwnerDetails: React.FC<OwnerDetails> = ({ form }) => {
  const onFinish = (values: string) => {
    console.log("Form values:", values);
    // Perform any additional actions with the form data
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Typography className="text-left text-2xl mb-6 font-medium">
          Owner Details
        </Typography>
        <div className="flex w-full gap-4">
          <Form.Item
            name="firstName"
            className="w-full"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            className="w-full"
            rules={[{ required: true, message: "Please enter your lastName" }]}
          >
            <Input placeholder="lastName" />
          </Form.Item>
        </div>
        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Please enter your Email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="Password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="Confirm Password"
          rules={[
            { required: true, message: "Please enter your Confirm Password" },
          ]}
        >
          <Input placeholder="Confirm Password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OwnerDetails;
