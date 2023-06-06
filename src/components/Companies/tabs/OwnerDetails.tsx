import { Form, Input, Typography } from "antd";
import React from "react";

const OwnerDetails = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Perform any additional actions with the form data
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Typography className="text-left text-2xl mb-6 font-medium">
          Owner Details
        </Typography>
        <div className="flex w-full gap-4">
          <Form.Item
            name="fullName"
            className="w-full"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="addressLine1"
            className="w-full"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
        <Form.Item name="addressLine2">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[
            {
              required: true,
              message: "Please enter your city",
            },
          ]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please enter your state" }]}
        >
          <Input placeholder="Confirm Password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OwnerDetails;
