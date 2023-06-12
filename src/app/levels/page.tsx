"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Popconfirm, Input, Space, Form } from "antd";
import { useRouter } from "next/navigation";
import withAuth from "@/components/common/withAuth";

import { useAxo } from "../../services/helpers/api";
import { API } from "../../services/constant";
import { useAppSelector } from "@/redux/hooks";

const LevelsPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { user } = useAppSelector((state: any) => state?.userReducer);

  const [isModalVisible, setIsModalVisible] = useState({
    modal: false,
    id: null,
  });

  const [{ loading, data }, userFloorPost] = useAxo("post", API.USER_FLOORS);

  useEffect(() => {
    if (user?.id) {
      userFloorPost({ userId: user.id });
    }
  }, [user?.id]);

  const handleAddModalOpen = (id = null) => {
    setIsModalVisible({ id, modal: true });
  };

  const handleAddModalClose = () => {
    setIsModalVisible({ id: null, modal: false });
    form.resetFields();
  };

  const deleteItem = async (item: any) => {
    console.log("🚀  item:", item);
    try {
      await userFloorPost({ userId: user.id, deleteId: item?.id });
    } catch (err) {
      console.log("err:", err);
    }
  };

  const editItem = (item: any) => {
    form.setFieldsValue({ floor: item?.name });
    handleAddModalOpen(item?.id);
  };

  const handleOnFinish = async () => {
    try {
      const value = await form.validateFields();
      await userFloorPost({ userId: user.id, name: value?.floor });
      handleAddModalClose();
    } catch (err) {
      console.log("err:", err);
    }
  };

  const handleOnUpdate = async () => {
    try {
      const value = await form.validateFields();
      await userFloorPost({
        userId: user.id,
        name: value?.floor,
        id: isModalVisible?.id,
      });
      handleAddModalClose();
    } catch (err) {
      console.log("err:", err);
    }
  };

  const columns: any = [
    {
      title: <span className="font-extrabold text-18">House Levels</span>,
      dataIndex: "name",
      key: "name",
      render: (row: any) => (
        <Space
          onClick={() => {
            router.push("/levels/123");
          }}
          className="cursor-pointer"
        >
          {row}
        </Space>
      ),
    },
    {
      key: "action",
      align: "right",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => editItem(record)}>
            Edit
          </Button>

          <Popconfirm
            className="text-black"
            title="Are you sure to delete this floor?"
            onConfirm={() => deleteItem(record)}
            okButtonProps={{ loading: loading }}
            cancelButtonProps={{ disabled: loading }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => handleAddModalOpen(null)}>
          Add Level
        </Button>
      </div>

      <Table dataSource={data} columns={columns} loading={loading} />

      <Modal
        title={!isModalVisible?.id ? "Add floor" : "Edit floor"}
        open={isModalVisible?.modal}
        onCancel={handleAddModalClose}
        footer={[
          <Button onClick={handleAddModalClose} key="1" disabled={loading}>
            Cancel
          </Button>,
          <Button
            onClick={!isModalVisible?.id ? handleOnFinish : handleOnUpdate}
            type="primary"
            key="2"
            loading={loading}
          >
            {!isModalVisible?.id ? "Submit" : "Update"}
          </Button>,
        ]}
      >
        <Form name="basic" form={form}>
          <Form.Item
            name="floor"
            rules={[{ required: true, message: "Please input your floor!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withAuth(LevelsPage);
