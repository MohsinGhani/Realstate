import { Form, Input } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import { FormInstance } from "antd/lib/form";

interface Address {
  form: FormInstance;
  required: any;
  isEditable: any;
}

const Address: React.FC<Address> = ({ form, required, isEditable }) => {
  return (
    <div>
      <Form form={form} disabled={isEditable}>
        <Typography className="text-left text-2xl  mb-6 font-medium">
          Address
        </Typography>
        <div className="flex w-full gap-4">
          <Form.Item name="street" className="w-full" rules={[{ required }]}>
            <Input placeholder="Street" />
          </Form.Item>
          <Form.Item name="city" className="w-full" rules={[{ required }]}>
            <Input placeholder="City" />
          </Form.Item>
        </div>
        <br></br>
        <Form.Item name="state" rules={[{ required }]}>
          <Input placeholder="State" />
        </Form.Item>
        <br></br>
        <Form.Item
          name="zipCode"
          rules={[
            {
              required,
            },
          ]}
        >
          <Input placeholder="Zip Code" />
        </Form.Item>

        <Typography className="text-left text-2xl  mb-2 font-medium ">
          Contractor Code
        </Typography>
        <Form.Item name="contractorCode" rules={[{ required }]}>
          <Input placeholder=" Contractor Code" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Address;
