"use client";

import React, { useMemo, useState } from "react";
import { Button, Form, Space, Steps, message } from "antd";
import Address from "./tabs/Address";
import QrCode from "./tabs/QrCode";
import OwnerDetails from "./tabs/OwnerDetails";
import Confirmation from "./tabs/Confirmation";
import { signup, confirm, login, logout } from "../../services/AuthService";

import { useAxo } from "../../services/helpers/api";
import { API } from "../../services/constant";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify";

const Registration = ({ searchParams }: any) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const [{ loading }, perSendEmail] = useAxo("post", API.RECIEVER_Email);

  const loginHandler = async () => {
    try {
      const res = await login("kiyiyab221@ozatvn.com", "kiyiyab221");
      console.log("🚀  res:", res);
    } catch (e: any) {
      message.error(e.message);
      throw new Error(e);
    }
  };
  const logoutHandler = async () => {
    try {
      const res = await logout();
      console.log("🚀  res:", res);
    } catch (e: any) {
      message.error(e.message);
      throw new Error(e);
    }
  };

  useMemo(() => {
    if (!!searchParams?.state?.length) {
      form.setFieldsValue({ ...searchParams });
      setCurrent(2);
    }
  }, [form, searchParams]);

  const next = async () => {
    try {
      const value = await form.validateFields();
      if (current == 0) {
      } else if (current == 1) {
        if (!searchParams?.state?.length) {
          return sendEmail(value);
        }
      } else if (current == 2) {
        await signuphandler(value);
      } else if (current == 3) {
        await confirmEmailHandler(value);
      }

      return setCurrent(current + 1);
    } catch (err) {
      console.log("err:", err);
    }
  };

  Hub.listen("auth", ({ payload }) => {
    console.log("🚀  payload:", payload);
    const { event } = payload;

    console.log("🚀  event:", event);
    if (event === "autoSignIn") {
      const user = payload.data;
      console.log("🚀  user:", user);
      // assign user
    } else if (event === "autoSignIn_failure") {
      // redirect to sign in page
    }
  });

  const prev = () => {
    setCurrent(current - 1);
  };

  const sendEmail = async (value: any) => {
    try {
      let link: any = "";

      if (typeof window !== "undefined") {
        link = `${window?.location?.origin}/registration?street=${value?.street}&city=${value?.city}&state=${value?.state}&zipCode=${value?.zipCode}&contractorCode=${value?.contractorCode}&recieverEmail=${value?.recieverEmail}`;
      }
      await perSendEmail({ link });
      router.push(link);
    } catch (e: any) {
      console.log("e:", e);
      throw new Error(e);
    }
  };

  const signuphandler = async (value: any) => {
    try {
      const res = await signup({
        password: value.password,
        username: value.email,
        email: value.email,
      });
      console.log("🚀  res:", res);
    } catch (e: any) {
      message.error(e.message);
      throw new Error(e);
    }
  };

  const confirmEmailHandler = async (value: any) => {
    try {
      const res = await confirm(value.email, value.confirmationCode);
      console.log("🚀  res:", res);
    } catch (e: any) {
      message.error(e.message);
      throw new Error(e);
    }
  };

  const steps: any = [
    {
      title: "Address",
      content: (
        <Address
          form={form}
          required={current == 0}
          isEditable={!!searchParams?.state?.length}
        />
      ),
    },
    {
      title: "QR code",
      content: (
        <QrCode
          form={form}
          required={current == 1}
          isEditable={!!searchParams?.state?.length}
        />
      ),
    },
    {
      title: "Owner  Details ",
      content: <OwnerDetails form={form} required={current == 2} />,
    },
    {
      title: "Confirmation",
      content: <Confirmation form={form} required={current == 3} />,
    },
  ];

  const items = steps.map((item: any) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div>
      <div className="">
        <Steps
          current={current}
          items={items}
          labelPlacement="vertical"
          className="mb-4"
        />
      </div>

      {steps?.map((t: any, i: any) => {
        return (
          <div key={i} className={i !== current ? "hidden" : ""}>
            {t.content}
          </div>
        );
      })}

      <div className="flex justify-end">
        <Space>
          {current > 0 && current < steps.length - 1 && (
            <Button onClick={() => prev()} disabled={loading}>
              {"Previous"}
            </Button>
          )}

          <Button type="primary" onClick={() => next()} loading={loading}>
            Next
          </Button>

          {/* <Space>
            <Button
              type="primary"
              onClick={() => loginHandler()}
              loading={loading}
            >
              login
            </Button>
            <Button
              type="primary"
              onClick={() => logoutHandler()}
              loading={loading}
            >
              logout
            </Button>
          </Space> */}
        </Space>
      </div>
    </div>
  );
};

export default Registration;
