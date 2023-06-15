import { login } from "@/services/AuthService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserData } from "@/services/helpers";
import { useAxo } from "@/services/helpers/api";
import { API } from "@/services/constant";

const iconProps = {
  rev: undefined,
};

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<any>(false);
  const [{}, userDetailsPost] = useAxo("post", API.USER_DETAILS);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await login(values?.username, values?.password);
      fetchUserData(userDetailsPost, dispatch);
      router.push("/");
    } catch (e: any) {
      message.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] p-8 mx-auto shadow">
      <h2 className="mb-4">Login</h2>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={
              <UserOutlined className="site-form-item-icon" {...iconProps} />
            }
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={
              <LockOutlined className="site-form-item-icon" {...iconProps} />
            }
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
