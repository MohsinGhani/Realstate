import { Button, Form, Input } from "antd";
import React from "react";

const login = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Perform any additional actions with the form data
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address Line 1"
        name="addressLine1"
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Address Line 2" name="addressLine2">
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please enter your city" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: "Please enter your state" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Postal Code"
        name="postalCode"
        rules={[{ required: true, message: "Please enter your postal code" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default login;
