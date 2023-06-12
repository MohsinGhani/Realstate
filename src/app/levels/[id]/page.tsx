"use client";

import React, { useState } from "react";

import {
  Table,
  Button,
  Modal,
  Typography,
  message,
  Popconfirm,
  Space,
  Form,
} from "antd";
import AddRoom from "@/components/AddRoom";

const initialData = [
  {
    key: 1,
    room: "Room 01",
    type: "Bed Room",
  },
  {
    key: 2,
    room: "Room 02",
    type: "Bathroom",
  },
  {
    key: 3,
    room: "Room 03 ",
    type: "Other",
  },
  {
    key: 4,
    room: "Room 04",
    type: "Garage",
  },
];

const LevelsPage2 = () => {
  const [data, setData] = useState(initialData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); //false
  const [form] = Form.useForm();

  const confirm = (record: any) => {
    deleteItem(record);
    message.success("Click on Yes");
  };

  const cancel = () => {
    message.error("Click on No");
  };

  const columns: any = [
    {
      title: "Rooms",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            title="Are you sure to delete this task?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const editItem = (item: any) => {
    console.log("🚀  item:", item);
  };

  const deleteItem = (item: any) => {
    const updatedData = data.filter((d: any) => d.id !== item.id);
    setData(updatedData);
  };

  const handleAddModalOpen = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalVisible(false);
  };

  const handleOnFinish = async () => {
    try {
      const value = await form.validateFields();
      console.log("🚀  value:", value);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={handleAddModalOpen}>
          Add Room
        </Button>
      </div>

      <Table dataSource={data} columns={columns} />

      <Modal
        open={isAddModalVisible}
        className="top-[20px]"
        footer={[
          <Button key="cancel" onClick={handleAddModalClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleOnFinish}>
            Save
          </Button>,
        ]}
      >
        <Typography className="fw-800 text-2xl">Room</Typography>
        <br />
        <AddRoom form={form} />
      </Modal>
    </div>
  );
};

export default LevelsPage2;
