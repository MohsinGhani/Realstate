"use client";

import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { useAxo } from "@/services/helpers/api";
import { API } from "@/services/constant";
import { addUserDetails } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";

const EditUserDetails = ({ user, handleCancel, open }: any) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [{ loading }, userDetailsPost] = useAxo("post", API.USER_DETAILS);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user });
    }
  }, [open]);

  const handleOk = async () => {
    try {
      const value = await form.validateFields();

      const res = await userDetailsPost({
        id: user?.id,
        userId: user?.id,
        ...value,
      });

      dispatch(
        addUserDetails({
          ...res?.[0],
        })
      );
      handleCancel();
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Modal
      title="Update User info"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ loading: loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item label="name" rules={[{ required: true }]}>
          <Input value={`${user?.firstName} ${user?.lastName}`} disabled />
        </Form.Item>
        <Form.Item label="email" rules={[{ required: true }]}>
          <Input value={user?.email} disabled />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="state" label="State" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="street" label="Street" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="zipCode" label="ZipCode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="contractorCode"
          label="Contractor Code"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserDetails;
