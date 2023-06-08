import { Form, Input, Typography } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";

interface OwnerDetails {
  form: FormInstance;
  required: any;
}

const OwnerDetails: React.FC<OwnerDetails> = ({ form, required }) => {
  const onFinish = (values: string) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Typography className="text-left text-2xl mb-6 font-medium">
          Owner Details
        </Typography>
        <div className="flex w-full gap-4">
          <Form.Item name="firstName" className="w-full" rules={[{ required }]}>
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item name="lastName" className="w-full" rules={[{ required }]}>
            <Input placeholder="Last name" />
          </Form.Item>
        </div>
        <Form.Item name="email" rules={[{ type: "email", required }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required }]} hasFeedback>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="confirm password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OwnerDetails;
