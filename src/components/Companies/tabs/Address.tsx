import { Form, Input } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";

const Address = ({ form }: any) => {
  return (
    <div>
      <Form form={form}>
        <Typography className="text-left text-2xl  mb-6 font-medium">
          Address
        </Typography>
        <div className="flex w-full gap-4">
          <Form.Item
            name="street"
            className="w-full"
            rules={[{ required: true }]}
          >
            <Input placeholder="Street" />
          </Form.Item>
          <Form.Item
            name="city"
            className="w-full"
            rules={[{ required: true }]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </div>
        <br></br>
        <Form.Item name="state" rules={[{ required: true }]}>
          <Input placeholder="State" />
        </Form.Item>
        <br></br>
        <Form.Item
          name="zipCode"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Zip Code" />
        </Form.Item>

        <Typography className="text-left text-2xl  mb-2 font-medium ">
          Contractor Code
        </Typography>
        <Form.Item
          name="contractorCode"
          rules={[{ required: true, message: "Please enter your state" }]}
        >
          <Input placeholder=" Contractor Code" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Address;
