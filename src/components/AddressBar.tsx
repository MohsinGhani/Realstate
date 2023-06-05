import { Button, Form, Input } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";

const login = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Perform any additional actions with the form data
  };

  return (
    <div>
      <Form className="w-11/12 ml-9 " onFinish={onFinish}>
        <Typography className="text-left text-2xl  mb-6 font-medium">
          Address
        </Typography>
        <div className="flex w-full gap-4">
          <Form.Item
            name="fullName"
            className="w-full"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Street" />
          </Form.Item>
          <Form.Item
            name="addressLine1"
            className="w-full"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </div>
        <br></br>
        <Form.Item name="addressLine2">
          <Input placeholder="State" />
        </Form.Item>
        <br></br>
        <Form.Item
          name="city"
          rules={[
            {
              required: true,
              message: "Please enter your city",
            },
          ]}
        >
          <Input placeholder="Zip Code" />
        </Form.Item>

        <Typography className="text-left text-2xl  mb-2 font-medium ">
          Contractor Code
        </Typography>
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please enter your state" }]}
        >
          <Input placeholder=" Contractor Code" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default login;
