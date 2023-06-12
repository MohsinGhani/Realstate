"use client";

import React, { useMemo, useState } from "react";
import { Button, Form, Space, Steps, message } from "antd";
import Address from "./tabs/Address";
import QrCode from "./tabs/QrCode";
import OwnerDetails from "./tabs/OwnerDetails";
import Confirmation from "./tabs/Confirmation";
import { signup, confirm } from "../../services/AuthService";

import { useAxo } from "../../services/helpers/api";
import { API } from "../../services/constant";
import { useRouter } from "next/navigation";

const Registration = ({ searchParams }: any) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [laoder, setLaoder] = useState(false);

  const [{}, perSendEmail] = useAxo("post", API.RECIEVER_Email);
  const [{}, userDetailsPost] = useAxo("post", API.USER_DETAILS);

  useMemo(() => {
    console.log("🚀 length:", searchParams?.state?.length);
    if (!!searchParams?.state?.length) {
      console.log("🚀  searchParams:", searchParams);
      form.setFieldsValue({ ...searchParams });
      setCurrent(2);
    }
  }, [form, searchParams]);

  const next = async () => {
    try {
      setLaoder(true);
      const value = await form.validateFields();
      if (current == 0) {
      } else if (current == 1) {
        if (!searchParams?.state?.length) {
          return sendEmail(value);
        }
      } else if (current == 2) {
        await signuphandler(value);
      } else if (current == 3) {
        return await confirmEmailHandler(value);
      }

      return setCurrent(current + 1);
    } catch (err) {
      console.log("err:", err);
    } finally {
      setLaoder(false);
    }
  };

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
      await signup({
        password: value.password,
        username: value.email,
        email: value.email,
      });
    } catch (e: any) {
      message.error(e.message);
      throw new Error(e);
    }
  };

  const confirmEmailHandler = async (value: any) => {
    try {
      const res: any = await confirm(
        value.email,
        value.confirmationCode,
        value.password
      );
      await userDetailsPost({ id: res?.confirmedUser?.username, ...value });
      router.push("/levels");
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

  return (
    <div>
      <div className="">
        <Steps
          current={current}
          items={steps.map((item: any) => ({
            key: item.title,
            title: item.title,
          }))}
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
            <Button onClick={() => prev()} disabled={laoder}>
              {"Previous"}
            </Button>
          )}

          <Button type="primary" onClick={() => next()} loading={laoder}>
            Next
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Registration;
